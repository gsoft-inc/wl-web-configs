import { render, screen } from "@testing-library/react";
import { About } from "../src/About.tsx";

test("About page has a h1 element", async () => {
    render(<About />);

    expect(await screen.findByRole("heading")).toBeDefined();
});
