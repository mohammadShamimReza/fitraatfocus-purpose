import { n as getFunctionsBaseUrl } from "./config-B0Zk47tz.mjs";
import { x as toFunctionsApiError, y as FunctionsApiError } from "./router-DTVZZ-r0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/templates-Dz8KNJUo.js
async function getBearerToken() {
	const { getFirebaseAuth } = await import("./client-HlrB73sm.mjs").then((n) => n.t).then((n) => n.t);
	const user = getFirebaseAuth().currentUser;
	if (!user) throw new FunctionsApiError("You need to sign in first.", 401);
	return user.getIdToken();
}
function buildFunctionsUrl(path, searchParams) {
	const baseUrl = getFunctionsBaseUrl();
	if (!baseUrl) throw new FunctionsApiError("Functions URL is not configured.", 503);
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	const url = new URL(`${baseUrl}${normalizedPath}`);
	if (searchParams) {
		for (const [key, value] of Object.entries(searchParams)) if (value !== void 0) url.searchParams.set(key, String(value));
	}
	return url.toString();
}
async function parsePayload(response) {
	const raw = await response.text();
	if (!raw) return null;
	try {
		return JSON.parse(raw);
	} catch {
		return raw;
	}
}
async function functionsRequest(path, options = {}) {
	const headers = { Accept: "application/json" };
	if (options.auth === "optional") try {
		headers.Authorization = `Bearer ${await getBearerToken()}`;
	} catch {}
	else if (options.auth !== false) headers.Authorization = `Bearer ${await getBearerToken()}`;
	if (options.body !== void 0) headers["Content-Type"] = "application/json";
	const response = await fetch(buildFunctionsUrl(path, options.searchParams), {
		method: options.method ?? "GET",
		headers,
		body: options.body === void 0 ? void 0 : JSON.stringify(options.body)
	});
	const payload = await parsePayload(response);
	if (!response.ok || payload !== null && typeof payload === "object" && "ok" in payload && payload.ok === false) throw toFunctionsApiError(payload, response.status, `Request failed (${response.status}).`);
	return payload;
}
var functionPaths = {
	templates: {
		public: "/v1/templates",
		mine: "/v1/templates/me",
		byCreator: "/v1/templates",
		detail: (templateId) => `/v1/templates/${templateId}`,
		publicDetail: (templateId) => `/v1/templates/${templateId}/public`,
		publish: (templateId) => `/v1/templates/${templateId}/publish`,
		download: (templateId) => `/v1/templates/${templateId}/download`,
		sections: (templateId) => `/v1/templates/${templateId}/sections`,
		reorderSections: (templateId) => `/v1/templates/${templateId}/sections/reorder`,
		section: (templateId, sectionId) => `/v1/templates/${templateId}/sections/${sectionId}`,
		tasks: (templateId) => `/v1/templates/${templateId}/tasks`,
		reorderTasks: (templateId) => `/v1/templates/${templateId}/tasks/reorder`,
		task: (templateId, taskId) => `/v1/templates/${templateId}/tasks/${taskId}`
	},
	profiles: {
		me: "/v1/profiles/me",
		detail: (uid) => `/v1/profiles/${uid}`
	}
};
function unwrapData(payload, keys = [
	"data",
	"template",
	"templates"
]) {
	if (payload && typeof payload === "object") {
		const record = payload;
		for (const key of keys) if (key in record) return record[key];
	}
	return payload;
}
var templateKeys = {
	all: ["templates"],
	public: () => [...templateKeys.all, "public"],
	publicDetail: (templateId) => [...templateKeys.public(), templateId],
	byCreator: (creatorId) => [
		...templateKeys.public(),
		"creator",
		creatorId
	],
	mine: () => [...templateKeys.all, "mine"],
	detail: (templateId) => [
		...templateKeys.all,
		"detail",
		templateId
	]
};
//#endregion
export { unwrapData as i, functionsRequest as n, templateKeys as r, functionPaths as t };
