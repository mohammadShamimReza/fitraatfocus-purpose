export function unwrapData<T>(payload: unknown, keys: string[] = ["data", "template", "templates"]): T {
  if (payload && typeof payload === "object") {
    const record = payload as Record<string, unknown>;

    for (const key of keys) {
      if (key in record) {
        return record[key] as T;
      }
    }
  }

  return payload as T;
}
