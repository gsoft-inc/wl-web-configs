function muteConsole(patterns: string[]) {
    const nativeConsoleError = console.error.bind(console);

    console.error = message => {
        if (!patterns.some(x => message.includes(x))) {
            nativeConsoleError(message);
        }
    };

    return () => {
        console.error = nativeConsoleError;
    };
}
