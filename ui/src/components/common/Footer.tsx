import React from "react";
import Configuration from "../../src/conf/Configuration";
export default function Footer() {
return (
    <footer
        style={{
        marginTop: "auto", // pushes footer to bottom if using flex column layout
        padding: "20px",
        textAlign: "center",
        backgroundColor: "#1f1f1f",
        color: "#eee",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "10px",
        }}
    >
    Created by xxdunedainxx © {new Date().getFullYear()}

      {/* Center: Optional links/icons */}
      <div style={{ display: "flex", gap: "15px" }}>
        <a href="https://github.com/xxdunedainxx/GuildWarsOneTeamBuilderWeb/tree/main" target="_blank" rel="noopener noreferrer">
          <img
            src="./githubIcon.jpeg"
            alt="GitHub"
            style={{ width: "24px", height: "24px", color: "grey" }}
          />
        </a>
      </div>

      {/* Right: Optional additional text */}
      <div>
        v{Configuration.version}
      </div>
    </footer>

);
}