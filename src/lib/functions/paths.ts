export const functionPaths = {
  templates: {
    public: "/templates",
    mine: "/templates/me",
    byCreator: "/templates",
    detail: (templateId: string) => `/templates/${templateId}`,
    publicDetail: (templateId: string) => `/templates/${templateId}/public`,
    publish: (templateId: string) => `/templates/${templateId}/publish`,
    download: (templateId: string) => `/templates/${templateId}/download`,
    sections: (templateId: string) => `/templates/${templateId}/sections`,
    section: (templateId: string, sectionId: string) => `/templates/${templateId}/sections/${sectionId}`,
    tasks: (templateId: string) => `/templates/${templateId}/tasks`,
    task: (templateId: string, taskId: string) => `/templates/${templateId}/tasks/${taskId}`,
  },
  profiles: {
    me: "/profiles/me",
    detail: (uid: string) => `/profiles/${uid}`,
  },
} as const;
