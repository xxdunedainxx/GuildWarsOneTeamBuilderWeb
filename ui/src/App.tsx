import { useState } from 'react'
import './App.css'
import Setup from './src/utils/Setup';
import Database from './src/data/database/Database';
import { Routes, Route, Link } from "react-router-dom";
import TeamBuilder from "./pages/TeamBuilder";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ChangeLog from "./pages/ChangeLog";
import About from "./pages/About";
import UserGuide from "./pages/UserGuide";
import Footer from "./components/common/Footer";
// import NavBar from "./components/common/NavBar";


function App() {
  const [count, setCount] = useState(0)

  // Run general setup steps
  Setup.Run()

  // Load up db.json with all the skills and stuff into mem
  Database.InitializeDBInJSMem()

  return (
    <>
    <h2>GW team builder</h2>
      {/* Navigation */}
      <nav style={{ marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/app" style={{ marginRight: "10px" }}>Team builder app</Link>
        <Link to="/about" style={{ marginRight: "10px" }}>About/Info</Link>
        <Link to="/contact" style={{ marginRight: "10px" }}>Contact</Link>
        <Link to="/changeLog" style={{ marginRight: "10px" }}>Change Log</Link>
        <Link to="/userguide">User guide</Link>
      </nav>

      {/* Page content */}
      <Routes>
        <Route path="/app" element={<TeamBuilder/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/changeLog" element={<ChangeLog/>} />
        <Route path="/userguide" element={<UserGuide/>} />
      </Routes>

      <Footer/>
    </>
  )
}

export default App
