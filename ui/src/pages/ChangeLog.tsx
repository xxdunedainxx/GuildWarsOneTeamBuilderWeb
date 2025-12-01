export default function ChangeLog() {
    return (
         <div
             style={{
                fontSize: "30px",
                maxWidth: "70%",
                margin: '0 auto'
            }}
         >
            <h2>Change Log</h2>

            This page is simply used to track all changes made to the application.
            <h3>v0.0.2</h3>
            <ul style={{
                textAlign: "left",      /* Align text and bullets to the left */
                listStylePosition: "outside", /* Ensures bullets appear outside the text block */
                paddingLeft: "20px"    /* Optional: adds space between bullets and text */
            }}>
                <li>🆕 rename site from 'ui' to 'GW Team builder'</li>
                <li>🆕 Github links/icon in footer working</li>
                <li>🐛 BUG - Fix 'no attribute' data mining</li>
                <li>🐛 BUG - Fix issue with adrenaline vs overcast - see vaporblade as an exmaple</li>
                <li>🐛 BUG - Fix data mining issue with res sig</li>
                <li>🐛 Support 'Common' attribute skills in UI (res sig)</li>
                <li>🐛 BUG - Fix data mining issue with exhaust attribute</li>
                <li>🐛 BUG - Support UI rendering for sufferring and exhaust attributes</li>
                <li>🐛 BUG - Add support for addrenaline in UI</li>
                <li>🐛 BUG - Add support for necromancer/ritualist "sacrifice" attribute</li>
                <li>🆕 Navigation bar improvement </li>
            </ul>

            <h3>v0.0.1</h3>
            <p>First version of the app! Nothing specific or important to note.</p>
            <a href="https://github.com/xxdunedainxx/GuildWarsOneTeamBuilderWeb/commit/e9359cad8e410f7bfbe3b25f8f9d48cb908b8330">Referal commit</a>


         </div>
    )
}