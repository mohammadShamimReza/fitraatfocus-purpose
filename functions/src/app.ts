import express from "express";

import { errorHandler } from "./middleware/error.middleware";
import { notFound } from "./middleware/not-found.middleware";
import { apiRouter } from "./routes";

const app = express();

app.use(express.json({ limit: "100kb" }));

app.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "Fitraat Focus Studio API",
    docs: {
      health: "GET /v1/health",
      templates:
        "GET /v1/templates, GET /v1/templates/me, POST /v1/templates, " +
        "GET /v1/templates/:templateId, PATCH /v1/templates/:templateId, " +
        "POST /v1/templates/:templateId/publish, POST /v1/templates/:templateId/download",
      sections:
        "POST /v1/templates/:templateId/sections, " +
        "PATCH /v1/templates/:templateId/sections/:sectionId, " +
        "DELETE /v1/templates/:templateId/sections/:sectionId",
      tasks:
        "POST /v1/templates/:templateId/tasks, " +
        "PATCH /v1/templates/:templateId/tasks/:taskId, " +
        "DELETE /v1/templates/:templateId/tasks/:taskId",
      profiles: "GET/PATCH /v1/profiles/me, GET /v1/profiles/:uid",
    },
  });
});

app.use("/v1", apiRouter);

app.use(notFound);
app.use(errorHandler);

export default app;
