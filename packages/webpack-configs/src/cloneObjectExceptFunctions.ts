export function cloneObjectExceptFunctions<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}
