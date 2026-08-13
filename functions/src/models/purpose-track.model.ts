import type { TemplateSection, TemplateTask, TaskPriority } from "./template.model";

export type PurposeTrackTaskStatus = "open" | "done";

export type PurposeTrackSection = TemplateSection;

export type PurposeTrackTask = TemplateTask & {
  status: PurposeTrackTaskStatus;
  completedAt?: string;
};

export type PurposeTrack = {
  id: string;
  ownerUid: string;
  sourceTemplateId: string;
  title: string;
  purpose: string;
  story: string;
  category: string;
  creatorUid: string;
  creatorName: string;
  pulledAt: string;
  updatedAt: string;
  sections: PurposeTrackSection[];
  tasks: PurposeTrackTask[];
  doneCount: number;
  taskCount: number;
};

export function copyTasksFromTemplate(tasks: TemplateTask[]): PurposeTrackTask[] {
  return tasks.map((task) => ({
    ...task,
    status: "open" as const,
  }));
}

export function withTrackCounts(track: PurposeTrack): PurposeTrack {
  return {
    ...track,
    taskCount: track.tasks.length,
    doneCount: track.tasks.filter((task) => task.status === "done").length,
  };
}

export function isTaskPriority(value: unknown): value is TaskPriority {
  return value === "low" || value === "medium" || value === "high";
}
