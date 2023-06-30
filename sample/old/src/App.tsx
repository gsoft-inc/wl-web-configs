import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Home } from "./Home.tsx";
import { RootLayout } from "./RootLayout.tsx";

const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
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
