import { Link, Outlet } from "react-router-dom";
import "./RootLayout.css";

export function RootLayout() {
    return (
        <>
            <nav style={{ marginBottom: "20px" }}>
                <ul className="nav">
                    <li className="nav-item"><Link to="/">Home</Link></li>
                    <li className="nav-item"><Link to="/about">About</Link></li>
                </ul>
            </nav>
            <Outlet />
        </>
    );
}
