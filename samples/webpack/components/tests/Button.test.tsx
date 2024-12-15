import { render, screen } from "@testing-library/react";
import { Button } from "../src/Button.tsx";

test("About page has a h1 element", async () => {
    render(<Button>My button</Button>);

    expect(await screen.findByRole("button")).toBeDefined();
});
