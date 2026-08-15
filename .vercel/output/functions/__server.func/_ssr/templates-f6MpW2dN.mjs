import { a as useQueryClient, n as queryOptions, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as unwrapData, n as functionsRequest, r as templateKeys, t as functionPaths } from "./templates-Dz8KNJUo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-f6MpW2dN.js
async function listPublicTemplates() {
	return unwrapData(await functionsRequest(functionPaths.templates.public, { auth: false }));
}
async function listTemplatesByCreator(creatorId) {
	return unwrapData(await functionsRequest(functionPaths.templates.byCreator, {
		auth: false,
		searchParams: { creatorId }
	}));
}
async function listMyTemplates() {
	return unwrapData(await functionsRequest(functionPaths.templates.mine));
}
async function getTemplate(templateId) {
	return unwrapData(await functionsRequest(functionPaths.templates.detail(templateId), { auth: "optional" }));
}
async function getPublicTemplate(templateId) {
	return unwrapData(await functionsRequest(functionPaths.templates.publicDetail(templateId), { auth: false }));
}
async function createTemplate(input) {
	return unwrapData(await functionsRequest(functionPaths.templates.public, {
		method: "POST",
		body: input
	}));
}
async function updateTemplate(templateId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.detail(templateId), {
		method: "PATCH",
		body: input
	}));
}
async function publishTemplate(templateId) {
	return unwrapData(await functionsRequest(functionPaths.templates.publish(templateId), { method: "POST" }));
}
async function downloadTemplate(templateId) {
	return unwrapData(await functionsRequest(functionPaths.templates.download(templateId), { method: "POST" }));
}
async function createSection(templateId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.sections(templateId), {
		method: "POST",
		body: input
	}));
}
async function updateSection(templateId, sectionId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.section(templateId, sectionId), {
		method: "PATCH",
		body: input
	}));
}
async function deleteSection(templateId, sectionId) {
	await functionsRequest(functionPaths.templates.section(templateId, sectionId), { method: "DELETE" });
}
async function reorderSections(templateId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.reorderSections(templateId), {
		method: "POST",
		body: input
	}));
}
async function createTask(templateId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.tasks(templateId), {
		method: "POST",
		body: input
	}));
}
async function updateTask(templateId, taskId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.task(templateId, taskId), {
		method: "PATCH",
		body: input
	}));
}
async function deleteTask(templateId, taskId) {
	await functionsRequest(functionPaths.templates.task(templateId, taskId), { method: "DELETE" });
}
async function reorderTasks(templateId, input) {
	return unwrapData(await functionsRequest(functionPaths.templates.reorderTasks(templateId), {
		method: "POST",
		body: input
	}));
}
async function invalidateTemplateQueries(queryClient, templateId) {
	await queryClient.invalidateQueries({ queryKey: templateKeys.all });
	if (templateId) {
		await queryClient.invalidateQueries({ queryKey: templateKeys.detail(templateId) });
		await queryClient.invalidateQueries({ queryKey: templateKeys.publicDetail(templateId) });
	}
}
function useInvalidateTemplates(templateId) {
	const queryClient = useQueryClient();
	return () => invalidateTemplateQueries(queryClient, templateId);
}
function useCreateSectionMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (input) => createSection(templateId, input),
		onSuccess: () => invalidate()
	});
}
function useCreateTaskMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (input) => createTask(templateId, input),
		onSuccess: () => invalidate()
	});
}
function useCreateTemplateMutation() {
	const invalidate = useInvalidateTemplates();
	return useMutation({
		mutationFn: (input) => createTemplate(input),
		onSuccess: () => invalidate()
	});
}
function creatorTemplatesQueryOptions(creatorId) {
	return queryOptions({
		queryKey: templateKeys.byCreator(creatorId),
		queryFn: () => listTemplatesByCreator(creatorId)
	});
}
function useCreatorTemplatesQuery(creatorId, enabled) {
	return useQuery({
		...creatorTemplatesQueryOptions(creatorId),
		enabled: enabled && Boolean(creatorId)
	});
}
function useDeleteSectionMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (sectionId) => deleteSection(templateId, sectionId),
		onSuccess: () => invalidate()
	});
}
function useDeleteTaskMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (taskId) => deleteTask(templateId, taskId),
		onSuccess: () => invalidate()
	});
}
function useDownloadTemplateMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: () => downloadTemplate(templateId),
		onSuccess: () => invalidate()
	});
}
function myTemplatesQueryOptions() {
	return queryOptions({
		queryKey: templateKeys.mine(),
		queryFn: listMyTemplates
	});
}
function useMyTemplatesQuery(enabled) {
	return useQuery({
		...myTemplatesQueryOptions(),
		enabled
	});
}
function publicTemplateQueryOptions(templateId) {
	return queryOptions({
		queryKey: templateKeys.publicDetail(templateId),
		queryFn: () => getPublicTemplate(templateId)
	});
}
function usePublicTemplateQuery(templateId, enabled) {
	return useQuery({
		...publicTemplateQueryOptions(templateId),
		enabled: enabled && Boolean(templateId)
	});
}
function publicTemplatesQueryOptions() {
	return queryOptions({
		queryKey: templateKeys.public(),
		queryFn: listPublicTemplates
	});
}
function usePublicTemplatesQuery(enabled) {
	return useQuery({
		...publicTemplatesQueryOptions(),
		enabled
	});
}
function usePublishTemplateMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: () => publishTemplate(templateId),
		onSuccess: () => invalidate()
	});
}
function useReorderSectionsMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (input) => reorderSections(templateId, input),
		onSuccess: () => invalidate()
	});
}
function useReorderTasksMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (input) => reorderTasks(templateId, input),
		onSuccess: () => invalidate()
	});
}
function templateQueryOptions(templateId) {
	return queryOptions({
		queryKey: templateKeys.detail(templateId),
		queryFn: () => getTemplate(templateId)
	});
}
function useTemplateQuery(templateId, enabled) {
	return useQuery({
		...templateQueryOptions(templateId),
		enabled: enabled && Boolean(templateId)
	});
}
function useUpdateSectionMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: ({ sectionId, input }) => updateSection(templateId, sectionId, input),
		onSuccess: () => invalidate()
	});
}
function useUpdateTaskMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: ({ taskId, input }) => updateTask(templateId, taskId, input),
		onSuccess: () => invalidate()
	});
}
function useUpdateTemplateMutation(templateId) {
	const invalidate = useInvalidateTemplates(templateId);
	return useMutation({
		mutationFn: (input) => updateTemplate(templateId, input),
		onSuccess: () => invalidate()
	});
}
//#endregion
export { useUpdateTaskMutation as _, useCreatorTemplatesQuery as a, useDownloadTemplateMutation as c, usePublicTemplatesQuery as d, usePublishTemplateMutation as f, useUpdateSectionMutation as g, useTemplateQuery as h, useCreateTemplateMutation as i, useMyTemplatesQuery as l, useReorderTasksMutation as m, useCreateSectionMutation as n, useDeleteSectionMutation as o, useReorderSectionsMutation as p, useCreateTaskMutation as r, useDeleteTaskMutation as s, updateTemplate as t, usePublicTemplateQuery as u, useUpdateTemplateMutation as v };
