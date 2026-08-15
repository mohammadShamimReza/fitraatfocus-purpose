import { a as useQueryClient, n as queryOptions, r as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { i as unwrapData, n as functionsRequest, r as templateKeys, t as functionPaths } from "./templates-Dz8KNJUo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profiles-DSpIcg7v.js
async function getProfile(uid) {
	return unwrapData(await functionsRequest(functionPaths.profiles.detail(uid), { auth: false }));
}
async function getMyProfile() {
	return unwrapData(await functionsRequest(functionPaths.profiles.me));
}
async function updateMyProfile(input) {
	return unwrapData(await functionsRequest(functionPaths.profiles.me, {
		method: "PATCH",
		body: input
	}));
}
var profileKeys = {
	all: ["profiles"],
	me: () => [...profileKeys.all, "me"],
	detail: (uid) => [
		...profileKeys.all,
		"detail",
		uid
	]
};
function myProfileQueryOptions() {
	return queryOptions({
		queryKey: profileKeys.me(),
		queryFn: getMyProfile
	});
}
function useMyProfileQuery(enabled) {
	return useQuery({
		...myProfileQueryOptions(),
		enabled
	});
}
function profileQueryOptions(uid) {
	return queryOptions({
		queryKey: profileKeys.detail(uid),
		queryFn: () => getProfile(uid)
	});
}
function useProfileQuery(uid, enabled) {
	return useQuery({
		...profileQueryOptions(uid),
		enabled: enabled && Boolean(uid)
	});
}
async function invalidateProfileQueries(queryClient, profile) {
	await queryClient.invalidateQueries({ queryKey: profileKeys.all });
	await queryClient.invalidateQueries({ queryKey: templateKeys.all });
	if (!profile) return;
	queryClient.setQueryData(profileKeys.me(), profile);
	queryClient.setQueryData(profileKeys.detail(profile.uid), profile);
}
function useUpdateMyProfileMutation() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (input) => updateMyProfile(input),
		onSuccess: (profile) => invalidateProfileQueries(queryClient, profile)
	});
}
//#endregion
export { useProfileQuery as n, useUpdateMyProfileMutation as r, useMyProfileQuery as t };
