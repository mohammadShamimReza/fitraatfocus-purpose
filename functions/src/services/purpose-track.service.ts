import { FieldValue } from "firebase-admin/firestore";

import { collections, db } from "../config/admin";
import { nowIso, purposeTrackDocId } from "../lib/ids";
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

function buildTrack(ownerUid: string, template: PurposeTemplateDetail): PurposeTrack {
  const pulledAt = nowIso();
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
    ...(template.imageUrl ? { imageUrl: template.imageUrl } : {}),
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
  return db.runTransaction(async (tx) => {
    const snapshot = await tx.get(ref);
    if (snapshot.exists) {
      return asTrack(
        snapshot.id,
        (snapshot.data() ?? {}) as Record<string, unknown>,
      );
    }

    const track = buildTrack(ownerUid, template);
    tx.set(ref, track);
    return track;
  });
}

export async function syncTrackCovers(
  sourceTemplateId: string,
  imageUrl?: string,
): Promise<void> {
  const snapshot = await tracks
    .where("sourceTemplateId", "==", sourceTemplateId)
    .get();
  if (snapshot.empty) {
    return;
  }

  const url = imageUrl?.trim() ?? "";
  const docs = snapshot.docs;
  for (let i = 0; i < docs.length; i += 450) {
    const batch = db.batch();
    for (const doc of docs.slice(i, i + 450)) {
      if (url) {
        batch.update(doc.ref, { imageUrl: url });
      } else {
        batch.update(doc.ref, { imageUrl: FieldValue.delete() });
      }
    }
    await batch.commit();
  }
}
