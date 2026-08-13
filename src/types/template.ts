export const TEMPLATE_STATUSES = ["draft", "published"] as const;
export const TEMPLATE_VISIBILITIES = ["public", "unlisted", "private"] as const;
export const TEMPLATE_ACCESS_LEVELS = ["free"] as const;
export const TASK_PRIORITIES = ["low", "medium", "high"] as const;

export type TemplateStatus = (typeof TEMPLATE_STATUSES)[number];
export type TemplateVisibility = (typeof TEMPLATE_VISIBILITIES)[number];
export type TemplateAccess = (typeof TEMPLATE_ACCESS_LEVELS)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type TemplateSection = {
  id: string;
  title: string;
  description: string;
  order: number;
};

export type TemplateTask = {
  id: string;
  title: string;
  notes: string;
  priority: TaskPriority;
  tags: string[];
  sectionId: string;
  order: number;
  estimatedMinutes?: number;
};

export type PurposeTemplate = {
  id: string;
  title: string;
  purpose: string;
  story: string;
  description: string;
  category: string;
  tags: string[];
  creatorUid: string;
  creatorName: string;
  status: TemplateStatus;
  visibility: TemplateVisibility;
  access: TemplateAccess;
  sectionCount: number;
  taskCount: number;
  forkCount: number;
  createdAt: string;
  updatedAt: string;
};

export type PurposeTemplateDetail = PurposeTemplate & {
  sections: TemplateSection[];
  tasks: TemplateTask[];
};

export type CreateTemplateInput = {
  title: string;
  purpose: string;
  story: string;
  description: string;
  category: string;
  tags?: string[];
  visibility?: TemplateVisibility;
  access?: TemplateAccess;
};

export type UpdateTemplateInput = Partial<
  Pick<PurposeTemplate, "title" | "purpose" | "story" | "description" | "category" | "tags" | "visibility">
>;

export type CreateSectionInput = {
  title: string;
  description?: string;
};

export type UpdateSectionInput = Partial<Pick<TemplateSection, "title" | "description" | "order">>;

export type CreateTaskInput = {
  title: string;
  notes?: string;
  priority?: TaskPriority;
  tags?: string[];
  sectionId: string;
  estimatedMinutes?: number;
};

export type UpdateTaskInput = Partial<
  Pick<TemplateTask, "title" | "notes" | "priority" | "tags" | "sectionId" | "order" | "estimatedMinutes">
>;
