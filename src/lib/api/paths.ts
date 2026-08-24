export const functionPaths = {
  templates: {
    public: "/v1/templates",
    mine: "/v1/templates/me",
    byCreator: "/v1/templates",
    detail: (templateId: string) => `/v1/templates/${templateId}`,
    publicDetail: (templateId: string) => `/v1/templates/${templateId}/public`,
    publicReviews: (templateId: string) =>
      `/v1/templates/${templateId}/public/reviews`,
    publish: (templateId: string) => `/v1/templates/${templateId}/publish`,
    download: (templateId: string) => `/v1/templates/${templateId}/download`,
    sections: (templateId: string) => `/v1/templates/${templateId}/sections`,
    reorderSections: (templateId: string) => `/v1/templates/${templateId}/sections/reorder`,
    section: (templateId: string, sectionId: string) => `/v1/templates/${templateId}/sections/${sectionId}`,
    tasks: (templateId: string) => `/v1/templates/${templateId}/tasks`,
    reorderTasks: (templateId: string) => `/v1/templates/${templateId}/tasks/reorder`,
    task: (templateId: string, taskId: string) => `/v1/templates/${templateId}/tasks/${taskId}`,
  },
  profiles: {
    me: "/v1/profiles/me",
    detail: (uid: string) => `/v1/profiles/${uid}`,
  },
} as const;
