import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./components/Nav";
import "./main.css";

function Layout({ currentUser }) {
  return (
    <>
      <Nav currentUser={currentUser} />

      <main className="main-container">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
