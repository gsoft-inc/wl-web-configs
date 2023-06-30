// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isObject(value: any): value is Record<string, unknown> {
    return typeof value === "object" && !Array.isArray(value) && value != null;
}
