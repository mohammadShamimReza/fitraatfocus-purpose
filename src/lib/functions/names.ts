export const functionNames = {
  templates: {
    listPublic: "listPublicTemplates",
    listMine: "listMyTemplates",
    listByCreator: "listTemplatesByCreator",
    get: "getTemplate",
    getPublic: "getPublicTemplate",
    create: "createTemplate",
    update: "updateTemplate",
    publish: "publishTemplate",
    download: "downloadTemplate",
    createSection: "createSection",
    updateSection: "updateSection",
    deleteSection: "deleteSection",
    createTask: "createTask",
    updateTask: "updateTask",
    deleteTask: "deleteTask",
  },
  profiles: {
    getMine: "getMyProfile",
    get: "getProfile",
    updateMine: "updateMyProfile",
  },
} as const;
