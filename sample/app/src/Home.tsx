import { helloFrom } from "@sample/utils";
import "./Home.css";

export function Home() {
    return (
        <div>
            <h1 className="title">Home</h1>
            <div>{helloFrom("the homepage")}</div>
        </div>
    );
}
