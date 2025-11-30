import { Routes, Route, Link } from "react-router-dom";

export default function Home() {
    return (
        <div
            style={{
                fontSize: "30px",
                maxWidth: "70%",
                margin: '0 auto'
            }}

        >
            <h2>General Information</h2>
            Welcome to the <strong>Guild Wars 1</strong> team builder application! This is currently in development (I made this in a few hours).
            <br />
            This application is meant to be a web based version of the <a href="http://www.gwteambuilder.de/en/about.htm">original Guild Wars team builder application</a>.
            <br />
            Since the original team builder application does not appear to be maintained any longer,
            and is a local desktop application, I figured it may be nice to have a web based version.
            Keep in mind this application is still in development and will be improved. Please refer to the github repository for information.
            <br />
            <strong style={{color: "red"}}>NOTE: If you are using this on mobile (a phone),
            the application's user interface may not function as expected.
            I plan to add better mobile support in the future.</strong><br />
            <br />
            To use the team builder app, see <Link to="/app" style={{ marginRight: "10px" }}>this page with the main app</Link>.
            <br />
            <h2>Open sourced and open to contributions</h2>
            This application is open sourced on github and is open to contributions
             for anyone that would like to contribute or even host their own version!
            <br />
            For more information regarding filing bugs/feature requests (things you would like to see in the app),
            contributions, the source code, or anything else.. see the <Link to="/about" style={{ marginRight: "10px" }}>About/Info Page</Link>.

        </div>

    )
}