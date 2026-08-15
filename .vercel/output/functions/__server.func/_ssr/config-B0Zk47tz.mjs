//#region node_modules/.nitro/vite/services/ssr/assets/rolldown-runtime-D7D4PA-g.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/config-B0Zk47tz.js
function readEnv(name) {
	return {
		"BASE_URL": "/",
		"DEV": false,
		"MODE": "production",
		"PROD": true,
		"SSR": true,
		"TSS_DEV_SERVER": "false",
		"TSS_DEV_SSR_STYLES_BASEPATH": "/",
		"TSS_DEV_SSR_STYLES_ENABLED": "true",
		"TSS_DISABLE_CSRF_MIDDLEWARE_WARNING": "false",
		"TSS_INLINE_CSS_ENABLED": "false",
		"TSS_ROUTER_BASEPATH": "",
		"TSS_SERVER_FN_BASE": "/_serverFn/",
		"VITE_FIREBASE_API_KEY": "AIzaSyABavjBCXkGXN3TZ2fhmuE8xAFYsgTzFL4",
		"VITE_FIREBASE_APP_ID": "1:1002827441536:web:a777e541baaa7378888d65",
		"VITE_FIREBASE_AUTH_DOMAIN": "fitraat-focus.firebaseapp.com",
		"VITE_FIREBASE_MEASUREMENT_ID": "G-W6KXYJ5TYR",
		"VITE_FIREBASE_MESSAGING_SENDER_ID": "1002827441536",
		"VITE_FIREBASE_PROJECT_ID": "fitraat-focus",
		"VITE_FIREBASE_STORAGE_BUCKET": "fitraat-focus.firebasestorage.app",
		"VITE_FUNCTIONS_REGION": "us-central1"
	}[name]?.trim() ?? "";
}
function getFirebaseWebConfig() {
	return {
		apiKey: readEnv("VITE_FIREBASE_API_KEY"),
		authDomain: readEnv("VITE_FIREBASE_AUTH_DOMAIN"),
		projectId: readEnv("VITE_FIREBASE_PROJECT_ID"),
		storageBucket: readEnv("VITE_FIREBASE_STORAGE_BUCKET"),
		messagingSenderId: readEnv("VITE_FIREBASE_MESSAGING_SENDER_ID"),
		appId: readEnv("VITE_FIREBASE_APP_ID")
	};
}
var DEFAULT_PROJECT_ID = "fitraat-focus";
var STUDIO_FUNCTION_NAME = "studio";
function isFirebaseConfigured(config = getFirebaseWebConfig()) {
	return Boolean(config.apiKey && config.authDomain && config.projectId && config.appId);
}
function getFunctionsRegion() {
	return "us-central1".trim();
}
function getStudioFunctionName() {
	return STUDIO_FUNCTION_NAME;
}
function getFunctionsBaseUrl() {
	const projectId = getFirebaseWebConfig().projectId || DEFAULT_PROJECT_ID;
	return `https://${getFunctionsRegion()}-${projectId}.cloudfunctions.net/${getStudioFunctionName()}`;
}
//#endregion
export { __exportAll as i, getFunctionsBaseUrl as n, isFirebaseConfigured as r, getFirebaseWebConfig as t };
