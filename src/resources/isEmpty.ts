export function isEmpty(obj: Record<string, any>): boolean {
    return !Object.keys(obj).length && obj.constructor === Object;
};