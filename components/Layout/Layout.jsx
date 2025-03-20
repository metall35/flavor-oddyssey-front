import { header } from "@/styles/animate-navbar.module.css"
import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

    return (
        <>
            <header className={`w-full ${header} z-10`}>
                <Navbar />
            </header>
            <main className={`w-full `} >{children}</main> {/* Ajustar el margen superior */}
            <footer className="w-full h-15 bg-flavor-1 text-center text-white p-5">
                <p>@todos los derechos reservados</p>
            </footer>
        </>
    )
}

export default Layout