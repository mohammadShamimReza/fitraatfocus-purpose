export const templateKeys = {
  all: ["templates"] as const,
  public: () => [...templateKeys.all, "public"] as const,
  publicDetail: (templateId: string, viewerUid?: string | null) =>
    viewerUid ?
      ([...templateKeys.public(), templateId, viewerUid] as const) :
      ([...templateKeys.public(), templateId] as const),
  byCreator: (creatorId: string) => [...templateKeys.public(), "creator", creatorId] as const,
  mine: () => [...templateKeys.all, "mine"] as const,
  detail: (templateId: string) => [...templateKeys.all, "detail", templateId] as const,
};
