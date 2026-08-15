import { i as __toESM } from "../_runtime.mjs";
import { Ct as require_jsx_runtime, wt as require_react } from "../_libs/@base-ui/react+[...].mjs";
import { C as Image } from "../_libs/lucide-react.mjs";
import { E as useI18n, S as Button$1 } from "./router-DTVZZ-r0.mjs";
import { a as FieldLabel, n as FieldDescription, t as Field } from "./field-BhX2yGOo.mjs";
import "../_libs/firebase.mjs";
import { n as getFirebaseApp } from "./client-HlrB73sm.mjs";
import { a as uploadBytes, i as ref, n as getDownloadURL, r as getStorage, t as deleteObject } from "../_libs/firebase__storage.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/system-cover-field-y4PppWSS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_COVER_BYTES = 10485760;
function getFirebaseStorage() {
	return getStorage(getFirebaseApp());
}
function templateCoverPath(uid, templateId, ext) {
	return `users/${uid}/templates/${templateId}/cover-${Date.now()}.${ext}`;
}
function coverExtension(file) {
	if (file.type.includes("png")) return "png";
	if (file.type.includes("webp")) return "webp";
	return "jpg";
}
function assertCoverFile(file, messages) {
	if (!file.type.startsWith("image/")) throw new Error(messages.type);
	if (file.size >= MAX_COVER_BYTES) throw new Error(messages.size);
}
async function uploadTemplateCover(path, file) {
	const storageRef = ref(getFirebaseStorage(), path);
	await uploadBytes(storageRef, file, { contentType: file.type || "image/jpeg" });
	return getDownloadURL(storageRef);
}
async function deleteStorageFile(path) {
	await deleteObject(ref(getFirebaseStorage(), path)).catch(() => {});
}
function SystemCoverField({ imageUrl, canEdit, busy = false, onPick, onRemove }) {
	const { t } = useI18n();
	const inputRef = (0, import_react.useRef)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
		className: "gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: t("cover.label") }),
			imageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: t("cover.alt"),
				className: "aspect-[16/9] w-full max-w-xl rounded-xl border object-cover"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex aspect-[16/9] w-full max-w-xl items-center justify-center rounded-xl border border-dashed bg-muted/40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "size-8 text-muted-foreground" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldDescription, { children: t("cover.help") }),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: inputRef,
						type: "file",
						accept: "image/jpeg,image/png,image/webp",
						className: "sr-only",
						disabled: busy,
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							if (file) onPick?.(file);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "outline",
						size: "sm",
						disabled: busy,
						onClick: () => inputRef.current?.click(),
						children: busy ? t("cover.uploading") : imageUrl ? t("cover.replace") : t("cover.add")
					}),
					imageUrl && onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
						type: "button",
						variant: "ghost",
						size: "sm",
						disabled: busy,
						onClick: onRemove,
						children: t("cover.remove")
					}) : null
				]
			}) : null
		]
	});
}
//#endregion
export { templateCoverPath as a, deleteStorageFile as i, assertCoverFile as n, uploadTemplateCover as o, coverExtension as r, SystemCoverField as t };
