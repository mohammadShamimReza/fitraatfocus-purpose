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
  downloadCount: number;
  completedCount: number;
  completionReviewCount: number;
  completionRatingSum: number;
  downloaderUids: string[];
  /** True when the signed-in viewer already has this purpose in Fitraat Focus. */
  addedToApp: boolean;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  storagePath?: string;
};

export type PurposeTemplateDetail = PurposeTemplate & {
  sections: TemplateSection[];
  tasks: TemplateTask[];
};

export type CatalogCreator = {
  uid: string;
  displayName: string;
  headline: string;
  expertise: string[];
  avatarUrl: string;
};

export type CatalogTemplate = PurposeTemplate & {
  creator: CatalogCreator;
};

export type PublicTemplateDetail = PurposeTemplateDetail & {
  creator: CatalogCreator;
  completionRatingAverage: number;
  completionReviews: PurposeCompletionReview[];
};

export type PurposeCompletionReview = {
  id: string;
  trackId: string;
  sourceTemplateId: string;
  rating: number;
  comment: string;
  isAnonymous: true;
  createdAt: string;
};

export type CreateTemplateInput = {
  title: string;
  purpose: string;
  description: string;
  category: string;
  tags?: string[];
  visibility?: TemplateVisibility;
  access?: TemplateAccess;
};

export type UpdateTemplateInput = Partial<
  Pick<
    PurposeTemplate,
    | "title"
    | "purpose"
    | "description"
    | "category"
    | "tags"
    | "visibility"
    | "imageUrl"
    | "storagePath"
  >
>;

export type CreateSectionInput = {
  title: string;
  description?: string;
};

export type UpdateSectionInput = Partial<
  Pick<TemplateSection, "title" | "description" | "order">
>;

export type CreateTaskInput = {
  title: string;
  notes?: string;
  priority?: TaskPriority;
  tags?: string[];
  sectionId: string;
  estimatedMinutes?: number;
};

export type UpdateTaskInput = Partial<
  Pick<
    TemplateTask,
    "title" | "notes" | "priority" | "tags" | "sectionId" | "order" | "estimatedMinutes"
  >
>;

export function toSummary(
  template: PurposeTemplateDetail,
  addedToApp = false,
): PurposeTemplate {
  return {
    id: template.id,
    title: template.title,
    purpose: template.purpose,
    description: template.description,
    category: template.category,
    tags: template.tags,
    creatorUid: template.creatorUid,
    creatorName: template.creatorName,
    status: template.status,
    visibility: template.visibility,
    access: template.access,
    sectionCount: template.sections.length,
    taskCount: template.tasks.length,
    forkCount: template.downloadCount,
    downloadCount: template.downloadCount,
    completedCount: template.completedCount,
    completionReviewCount: template.completionReviewCount,
    completionRatingSum: template.completionRatingSum,
    downloaderUids: template.downloaderUids,
    addedToApp,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
    ...(template.imageUrl ? { imageUrl: template.imageUrl } : {}),
    ...(template.storagePath ? { storagePath: template.storagePath } : {}),
  };
}

export function isPublicTemplate(template: PurposeTemplateDetail): boolean {
  return template.status === "published" && template.visibility === "public";
}

export function canViewTemplate(
  template: PurposeTemplateDetail,
  uid: string | undefined,
): boolean {
  return isPublicTemplate(template) || Boolean(uid && template.creatorUid === uid);
}

export function withCounts(template: PurposeTemplateDetail): PurposeTemplateDetail {
  return {
    ...template,
    sectionCount: template.sections.length,
    taskCount: template.tasks.length,
    forkCount: template.downloadCount,
  };
}
