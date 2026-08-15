import { n as __exportAll } from "../_runtime.mjs";
import { c as registerVersion } from "./@firebase/app+[...].mjs";
import { $ as onAuthStateChanged, A as checkActionCode, At as verifyBeforeUpdateEmail, B as getIdTokenResult, C as TwitterAuthProvider, Ct as updateCurrentUser, D as browserLocalPersistence, Dt as updateProfile, E as browserCookiePersistence, Et as updatePhoneNumber, F as deleteUser, G as initializeAuth, H as getRedirectResult, I as fetchSignInMethodsForEmail, J as linkWithCredential, K as initializeRecaptchaConfig, L as getAdditionalUserInfo, M as connectAuthEmulator, N as createUserWithEmailAndPassword, O as browserPopupRedirectResolver, Ot as useDeviceLanguage, P as debugErrorMap, Q as multiFactor, R as getAuth, S as TotpSecret, St as unlink, T as beforeAuthStateChanged, Tt as updatePassword, U as inMemoryPersistence, V as getMultiFactorResolver, W as indexedDBLocalPersistence, X as linkWithPopup, Y as linkWithPhoneNumber, Z as linkWithRedirect, _ as ProviderId, _t as signInWithEmailLink, a as EmailAuthCredential, at as reauthenticateWithPopup, b as SignInMethod, bt as signInWithRedirect, c as FactorId, ct as revokeAccessToken, d as OAuthCredential, dt as sendSignInLinkToEmail, et as onIdTokenChanged, f as OAuthProvider, ft as setPersistence, g as PhoneMultiFactorGenerator, gt as signInWithEmailAndPassword, h as PhoneAuthProvider, ht as signInWithCustomToken, i as AuthCredential, it as reauthenticateWithPhoneNumber, j as confirmPasswordReset, jt as verifyPasswordResetCode, k as browserSessionPersistence, kt as validatePassword, l as GithubAuthProvider, lt as sendEmailVerification, m as PhoneAuthCredential, mt as signInWithCredential, n as ActionCodeOperation, nt as prodErrorMap, o as EmailAuthProvider, ot as reauthenticateWithRedirect, p as OperationType, pt as signInAnonymously, q as isSignInWithEmailLink, r as ActionCodeURL, rt as reauthenticateWithCredential, s as FacebookAuthProvider, st as reload, t as AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY, tt as parseActionCodeURL, u as GoogleAuthProvider, ut as sendPasswordResetEmail, v as RecaptchaVerifier, vt as signInWithPhoneNumber, w as applyActionCode, wt as updateEmail, x as TotpMultiFactorGenerator, xt as signOut, y as SAMLAuthProvider, yt as signInWithPopup, z as getIdToken } from "./firebase__auth.mjs";
import "./firebase__storage.mjs";
//#region node_modules/firebase/app/dist/index.mjs
/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
registerVersion("firebase", "12.17.1", "app");
//#endregion
//#region node_modules/firebase/auth/dist/index.mjs
var dist_exports = /* @__PURE__ */ __exportAll({
	ActionCodeOperation: () => ActionCodeOperation,
	ActionCodeURL: () => ActionCodeURL,
	AuthCredential: () => AuthCredential,
	AuthErrorCodes: () => AUTH_ERROR_CODES_MAP_DO_NOT_USE_INTERNALLY,
	EmailAuthCredential: () => EmailAuthCredential,
	EmailAuthProvider: () => EmailAuthProvider,
	FacebookAuthProvider: () => FacebookAuthProvider,
	FactorId: () => FactorId,
	GithubAuthProvider: () => GithubAuthProvider,
	GoogleAuthProvider: () => GoogleAuthProvider,
	OAuthCredential: () => OAuthCredential,
	OAuthProvider: () => OAuthProvider,
	OperationType: () => OperationType,
	PhoneAuthCredential: () => PhoneAuthCredential,
	PhoneAuthProvider: () => PhoneAuthProvider,
	PhoneMultiFactorGenerator: () => PhoneMultiFactorGenerator,
	ProviderId: () => ProviderId,
	RecaptchaVerifier: () => RecaptchaVerifier,
	SAMLAuthProvider: () => SAMLAuthProvider,
	SignInMethod: () => SignInMethod,
	TotpMultiFactorGenerator: () => TotpMultiFactorGenerator,
	TotpSecret: () => TotpSecret,
	TwitterAuthProvider: () => TwitterAuthProvider,
	applyActionCode: () => applyActionCode,
	beforeAuthStateChanged: () => beforeAuthStateChanged,
	browserCookiePersistence: () => browserCookiePersistence,
	browserLocalPersistence: () => browserLocalPersistence,
	browserPopupRedirectResolver: () => browserPopupRedirectResolver,
	browserSessionPersistence: () => browserSessionPersistence,
	checkActionCode: () => checkActionCode,
	confirmPasswordReset: () => confirmPasswordReset,
	connectAuthEmulator: () => connectAuthEmulator,
	createUserWithEmailAndPassword: () => createUserWithEmailAndPassword,
	debugErrorMap: () => debugErrorMap,
	deleteUser: () => deleteUser,
	fetchSignInMethodsForEmail: () => fetchSignInMethodsForEmail,
	getAdditionalUserInfo: () => getAdditionalUserInfo,
	getAuth: () => getAuth,
	getIdToken: () => getIdToken,
	getIdTokenResult: () => getIdTokenResult,
	getMultiFactorResolver: () => getMultiFactorResolver,
	getRedirectResult: () => getRedirectResult,
	inMemoryPersistence: () => inMemoryPersistence,
	indexedDBLocalPersistence: () => indexedDBLocalPersistence,
	initializeAuth: () => initializeAuth,
	initializeRecaptchaConfig: () => initializeRecaptchaConfig,
	isSignInWithEmailLink: () => isSignInWithEmailLink,
	linkWithCredential: () => linkWithCredential,
	linkWithPhoneNumber: () => linkWithPhoneNumber,
	linkWithPopup: () => linkWithPopup,
	linkWithRedirect: () => linkWithRedirect,
	multiFactor: () => multiFactor,
	onAuthStateChanged: () => onAuthStateChanged,
	onIdTokenChanged: () => onIdTokenChanged,
	parseActionCodeURL: () => parseActionCodeURL,
	prodErrorMap: () => prodErrorMap,
	reauthenticateWithCredential: () => reauthenticateWithCredential,
	reauthenticateWithPhoneNumber: () => reauthenticateWithPhoneNumber,
	reauthenticateWithPopup: () => reauthenticateWithPopup,
	reauthenticateWithRedirect: () => reauthenticateWithRedirect,
	reload: () => reload,
	revokeAccessToken: () => revokeAccessToken,
	sendEmailVerification: () => sendEmailVerification,
	sendPasswordResetEmail: () => sendPasswordResetEmail,
	sendSignInLinkToEmail: () => sendSignInLinkToEmail,
	setPersistence: () => setPersistence,
	signInAnonymously: () => signInAnonymously,
	signInWithCredential: () => signInWithCredential,
	signInWithCustomToken: () => signInWithCustomToken,
	signInWithEmailAndPassword: () => signInWithEmailAndPassword,
	signInWithEmailLink: () => signInWithEmailLink,
	signInWithPhoneNumber: () => signInWithPhoneNumber,
	signInWithPopup: () => signInWithPopup,
	signInWithRedirect: () => signInWithRedirect,
	signOut: () => signOut,
	unlink: () => unlink,
	updateCurrentUser: () => updateCurrentUser,
	updateEmail: () => updateEmail,
	updatePassword: () => updatePassword,
	updatePhoneNumber: () => updatePhoneNumber,
	updateProfile: () => updateProfile,
	useDeviceLanguage: () => useDeviceLanguage,
	validatePassword: () => validatePassword,
	verifyBeforeUpdateEmail: () => verifyBeforeUpdateEmail,
	verifyPasswordResetCode: () => verifyPasswordResetCode
});
//#endregion
export { dist_exports as t };
