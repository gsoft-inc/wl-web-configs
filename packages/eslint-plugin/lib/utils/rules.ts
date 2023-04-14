import { Rule } from "eslint";
import { basename, sep } from "path";

export const sanitizePath = (filePath: string) => {
    return filePath.replace(/\//g, sep).trim();
};

export const splitPath = (filePath: string) => {
    return sanitizePath(filePath).split(sep);
};

export function getFilePath(context: Rule.RuleContext) {
    return sanitizePath(context.getFilename());
}

export function getFileName(context: Rule.RuleContext) {
    return basename(getFilePath(context));
}
