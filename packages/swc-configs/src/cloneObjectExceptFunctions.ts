export function cloneObjectExceptFunctions(obj: unknown) {
    return JSON.parse(JSON.stringify(obj));
}
