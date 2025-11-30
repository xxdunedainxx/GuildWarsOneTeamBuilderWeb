// import { Link } from "react-router-dom";
// import React from "react";
//
// export default function NavBar() {
// const linkStyle = {
// display: "inline-block",
// padding: "6px 12px",
// marginRight: "10px",
// border: "1px solid #ccc",
// borderRadius: "6px",
// textDecoration: "none",
// color: "#333",
// backgroundColor: "#f5f5f5",
// transition: "all 0.2s ease",
// };
//
// const hoverStyle = {
// backgroundColor: "#e0e0e0",
// borderColor: "#999",
// };
//
// const links = [
// { to: "/", label: "Home" },
// { to: "/app", label: "Team builder app" },
// { to: "/about", label: "About/Info" },
// { to: "/contact", label: "Contact" },
// { to: "/changeLog", label: "Change Log" },
// ];
//
// return (
// <nav style={{ marginBottom: "20px" }}>
// {links.map((link) => (
// <Link
// key={link.to}
// to={link.to}
// style={linkStyle}
// onMouseEnter={(e) => Object.assign(e.currentTarget.style, hoverStyle)}
// onMouseLeave={(e) => Object.assign(e.currentTarget.style, linkStyle)}
// >
// {link.label}
//
// ))}
//
// );
// }