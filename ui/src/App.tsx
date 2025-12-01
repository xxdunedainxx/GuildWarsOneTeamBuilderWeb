import { useState } from 'react'
import { Suspense, lazy } from "react";

import './App.css'
import Setup from './src/utils/Setup';
import Database from './src/data/database/Database';
import { Routes, Route, Link } from "react-router-dom";
// Lazy-load TeamBuilder
const TeamBuilder = lazy(() =>
  new Promise<{ default: React.ComponentType<any> }>((resolve) => {
    setTimeout(() =>
      resolve(import("./pages/TeamBuilder") as unknown as { default: React.ComponentType<any> }),
      1500
    );
  })
);
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import ChangeLog from "./pages/ChangeLog";
import About from "./pages/About";
import UserGuide from "./pages/UserGuide";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/Navbar";

function App() {
  const [count, setCount] = useState(0)

     // Run general setup steps
     Setup.Run()

     // Load up db.json with all the skills and stuff into mem
     Database.InitializeDBInJSMem()

  return (
    <>
    <h2>GW team builder</h2>
      <NavBar/>

      {/* Page content */}
      <Routes>
        {/* Only TeamBuilder is lazy-loaded */}
        <Route
          path="/app"
          element={
            <Suspense fallback={<div style={{ padding: 20, fontSize: 18 }}>Loading Team Builder...</div>}>
              <TeamBuilder />
            </Suspense>
          }
        />
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
