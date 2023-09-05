import "@sample/components/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";

if (process.env.USE_MSW === "true") {
    import("../mocks/browser.ts").then(({ worker }) => {
        worker.start();
    });
}

const root = createRoot(document.getElementById("root")!);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);
