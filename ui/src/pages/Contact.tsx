export default function Contact() {
    return (
        <div
            style={{
                fontSize: "30px",
                maxWidth: "70%",
                margin: '0 auto'
            }}

        >
            <h2>Contact</h2>
            For feature requests/bug fixes/contributions, you can either:

            <ul style={{
                textAlign: "left",      /* Align text and bullets to the left */
                listStylePosition: "outside", /* Ensures bullets appear outside the text block */
                paddingLeft: "20px"    /* Optional: adds space between bullets and text */
            }}>
                <li>File a github issue or contact me on github <a href="https://github.com/xxdunedainxx/GuildWarsOneTeamBuilderWeb">here</a></li>
                <li>Send me an email @ zrmmaster92@gmail.com</li>
            </ul>
        </div>
    )
}