import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { About } from "./About.tsx";
import { Home } from "./Home.tsx";
import { RootLayout } from "./RootLayout.tsx";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/about",
                element: <About />
            }
        ]
    }
]);

export function App() {
    return (
        <RouterProvider
            router={router}
            fallbackElement={<div>Loading...</div>}
        />
    );
}
