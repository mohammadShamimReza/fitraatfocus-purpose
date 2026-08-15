import { n as __exportAll } from "../_runtime.mjs";
import { i as __exportAll$1, r as isFirebaseConfigured, t as getFirebaseWebConfig } from "./config-B0Zk47tz.mjs";
import { a as getApp, o as getApps, s as initializeApp } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
import { R as getAuth, u as GoogleAuthProvider } from "../_libs/firebase__auth.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-HlrB73sm.js
var client_HlrB73sm_exports = /* @__PURE__ */ __exportAll({
	n: () => getFirebaseApp,
	t: () => client_exports
});
var client_exports = /* @__PURE__ */ __exportAll$1({
	getFirebaseApp: () => getFirebaseApp,
	getFirebaseAuth: () => getFirebaseAuth,
	getGoogleAuthProvider: () => getGoogleAuthProvider
});
function assertBrowser() {
	if (typeof window === "undefined") throw new Error("Firebase Auth is only available in the browser.");
}
function getFirebaseApp() {
	assertBrowser();
	const config = getFirebaseWebConfig();
	if (!isFirebaseConfigured(config)) throw new Error("Firebase is not configured. Add the VITE_FIREBASE_* values to your .env file.");
	if (getApps().length > 0) return getApp();
	return initializeApp(config);
}
function getFirebaseAuth() {
	return getAuth(getFirebaseApp());
}
function getGoogleAuthProvider() {
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: "select_account" });
	return provider;
}
//#endregion
export { getFirebaseApp as n, client_HlrB73sm_exports as t };
