import type { Configuration } from "webpack";

type WebpackPlugin = NonNullable<Configuration["plugins"]>[number];

export type PluginMatcher = (plugin: WebpackPlugin, index: number, array: WebpackPlugin[]) => boolean;

export function matchConstructorName(name: string): PluginMatcher {
    const matcher = (plugin: WebpackPlugin) => {
        return plugin?.constructor.name === name;
    };

    // Add contextual information about the matcher for debugging.
    matcher.info = {
        type: matchConstructorName.name,
        value: name
    };

    return matcher;
}

export interface PluginMatch {
    plugin: WebpackPlugin;
    index: number;
}

export function findPlugin(config: Configuration, matcher: PluginMatcher) {
    const matches: PluginMatch[] = [];

    config.plugins?.forEach((x, index, array) => {
        if (matcher(x, index, array)) {
            matches.push({
                plugin: x,
                index
            });
        }
    });

    if (matches.length > 1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        throw new Error(`[webpack-configs] Found more than 1 matching plugin. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }

    return matches[0];
}

export function prependPlugins(config: Configuration, newPlugins: WebpackPlugin[]) {
    config.plugins = [
        ...newPlugins,
        ...(config.plugins ?? [])
    ];
}

export function appendPlugins(config: Configuration, newPlugins: WebpackPlugin[]) {
    config.plugins = [
        ...(config.plugins ?? []),
        ...newPlugins
    ];
}

export function replacePlugin(config: Configuration, matcher: PluginMatcher, newPlugin: WebpackPlugin) {
    const match = findPlugin(config, matcher);

    if (match) {
        config.plugins![match.index] = newPlugin;
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Couldn't replace the plugin because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}

export function addBeforePlugin(config: Configuration, matcher: PluginMatcher, newPlugins: WebpackPlugin[]) {
    const match = findPlugin(config, matcher);

    if (match) {
        config.plugins?.splice(match.index, 0, ...newPlugins);
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Couldn't add the new plugins because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}

export function addAfterPlugin(config: Configuration, matcher: PluginMatcher, newPlugins: WebpackPlugin[]) {
    const match = findPlugin(config, matcher);

    if (match) {
        config.plugins?.splice(match.index + 1, 0, ...newPlugins);
    } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Couldn't add the new plugins because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}

export function removePlugins(config: Configuration, matcher: PluginMatcher) {
    const countBefore = config.plugins?.length ?? 0;

    config.plugins = config.plugins?.filter((...args) => !matcher(...args));

    const countAfter = config.plugins?.length ?? 0;

    if (countBefore === countAfter) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const matcherInfo = matcher.info;

        console.log(`[web-configs] Didn't remove any plugins because no match has been found. Matcher: "${JSON.stringify(matcherInfo)}"`);
    }
}
