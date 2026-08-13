export const profileKeys = {
  all: ["profiles"] as const,
  me: () => [...profileKeys.all, "me"] as const,
  detail: (uid: string) => [...profileKeys.all, "detail", uid] as const,
};
