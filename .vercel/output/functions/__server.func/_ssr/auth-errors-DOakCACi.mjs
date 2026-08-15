import { m as FirebaseError } from "../_libs/@firebase/app+[...].mjs";
import "../_libs/firebase.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-errors-DOakCACi.js
var AUTH_ERROR_KEYS = {
	"auth/user-disabled": "auth.userDisabled",
	"auth/popup-closed-by-user": "auth.popupClosed",
	"auth/cancelled-popup-request": "auth.popupClosed",
	"auth/popup-blocked": "auth.popupBlocked",
	"auth/network-request-failed": "auth.network",
	"auth/too-many-requests": "auth.tooMany",
	"auth/operation-not-allowed": "auth.notAllowed"
};
function getAuthErrorKey(error) {
	if (error instanceof FirebaseError) return AUTH_ERROR_KEYS[error.code] ?? "auth.generic";
	return "auth.generic";
}
//#endregion
export { getAuthErrorKey as t };
