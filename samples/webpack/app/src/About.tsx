import { Button } from "@webpack-sample/components";
import { helloFrom } from "@webpack-sample/tsup-lib";

export function About() {
    return (
        <>
            <h1>About</h1>
            <div>{helloFrom("the about page")}</div>
            <Button onClick={() => alert("The button has been clicked!")}>My button!</Button>
        </>
    );
}
