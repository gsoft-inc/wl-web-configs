import { sep } from "path";

export const sanitizePath = (filePath: string) => {
    return filePath.replace(/\//g, sep).trim();
};

export const splitPath = (filePath: string) => {
    return sanitizePath(filePath).split(sep);
};
