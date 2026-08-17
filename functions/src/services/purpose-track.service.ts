import { collections, db } from "../config/admin";
import { nowIso, purposeTrackDocId } from "../lib/ids";
import {
  copyCoverForTrack,
  isOwnTrackCover,
  type CopiedCover,
} from "../lib/storage";
import {
  copyTasksFromTemplate,
  type PurposeTrack,
  type PurposeTrackSection,
  type PurposeTrackTask,
  withTrackCounts,
} from "../models/purpose-track.model";
import type { PurposeTemplateDetail } from "../models/template.model";

const tracks = db.collection(collections.purposeTracks);

function asTrack(id: string, data: Record<string, unknown>): PurposeTrack {
  return withTrackCounts({
    id,
    ownerUid: String(data.ownerUid ?? ""),
    sourceTemplateId: String(data.sourceTemplateId ?? ""),
    title: String(data.title ?? ""),
    purpose: String(data.purpose ?? ""),
    story: String(data.story ?? ""),
    category: String(data.category ?? "other"),
    creatorUid: String(data.creatorUid ?? ""),
    creatorName: String(data.creatorName ?? ""),
    pulledAt: String(data.pulledAt ?? nowIso()),
    updatedAt: String(data.updatedAt ?? nowIso()),
    ...(typeof data.imageUrl === "string" && data.imageUrl.trim() ?
      { imageUrl: data.imageUrl.trim() } :
      {}),
    ...(typeof data.storagePath === "string" && data.storagePath.trim() ?
      { storagePath: data.storagePath.trim() } :
      {}),
    sections: Array.isArray(data.sections) ?
      (data.sections as PurposeTrackSection[]) :
      [],
    tasks: Array.isArray(data.tasks) ?
      (data.tasks as PurposeTrackTask[]) :
      [],
    doneCount: Number(data.doneCount ?? 0),
    taskCount: Number(data.taskCount ?? 0),
  });
}

function coverFields(cover?: CopiedCover): Pick<PurposeTrack, "imageUrl" | "storagePath"> {
  if (!cover) {
    return {};
  }
  return { imageUrl: cover.imageUrl, storagePath: cover.storagePath };
}

function buildTrack(
  ownerUid: string,
  template: PurposeTemplateDetail,
  cover?: CopiedCover,
): PurposeTrack {
  const pulledAt = nowIso();
  const copied = coverFields(cover);
  return withTrackCounts({
    id: purposeTrackDocId(ownerUid, template.id),
    ownerUid,
    sourceTemplateId: template.id,
    title: template.title,
    purpose: template.purpose,
    story: template.story,
    category: template.category,
    creatorUid: template.creatorUid,
    creatorName: template.creatorName,
    pulledAt,
    updatedAt: pulledAt,
    ...(copied.imageUrl ?
      { imageUrl: copied.imageUrl } :
      template.imageUrl ?
        { imageUrl: template.imageUrl } :
        {}),
    ...(copied.storagePath ? { storagePath: copied.storagePath } : {}),
    sections: template.sections.map((section) => ({ ...section })),
    tasks: copyTasksFromTemplate(template.tasks),
    doneCount: 0,
    taskCount: 0,
  });
}

export async function ensurePurposeTrack(
  ownerUid: string,
  template: PurposeTemplateDetail,
): Promise<PurposeTrack> {
  const ref = tracks.doc(purposeTrackDocId(ownerUid, template.id));
  const existing = await ref.get();
  if (existing.exists) {
    return asTrack(
      existing.id,
      (existing.data() ?? {}) as Record<string, unknown>,
    );
  }

  const copied = await copyCoverForTrack(
    template,
    ownerUid,
    ref.id,
  );

  return db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (snapshot.exists) {
      return asTrack(
        snapshot.id,
        (snapshot.data() ?? {}) as Record<string, unknown>,
      );
    }

    const track = buildTrack(ownerUid, template, copied);
    tx.set(ref, track);
    return track;
  });
}

/**
 * Give existing downloads their own cover file before the source image is
 * replaced or deleted. Tracks that already have a copied cover are skipped.
 */
export async function detachSharedTrackCovers(
  sourceTemplateId: string,
  source: { storagePath?: string; imageUrl?: string },
): Promise<void> {
  const snapshot = await tracks
    .where("sourceTemplateId", "==", sourceTemplateId)
    .get();
  if (snapshot.empty) {
    return;
  }

  const shared = snapshot.docs.filter((doc) => {
    const track = asTrack(
      doc.id,
      (doc.data() ?? {}) as Record<string, unknown>,
    );
    return !isOwnTrackCover(track.ownerUid, track.storagePath);
  });

  for (let i = 0; i < shared.length; i += 8) {
    const chunk = shared.slice(i, i + 8);
    const updates = await Promise.all(chunk.map(async (doc) => {
      const track = asTrack(
        doc.id,
        (doc.data() ?? {}) as Record<string, unknown>,
      );
      const copied = await copyCoverForTrack(source, track.ownerUid, track.id);
      return copied ? { ref: doc.ref, copied } : undefined;
    }));
    const batch = db.batch();
    let writes = 0;
    for (const update of updates) {
      if (!update) {
        continue;
      }
      batch.update(update.ref, {
        imageUrl: update.copied.imageUrl,
        storagePath: update.copied.storagePath,
      });
      writes += 1;
    }
    if (writes > 0) {
      await batch.commit();
    }
  }
}
