import { header } from "@/styles/animate-navbar.module.css"
import React from "react";
import Navbar from "./Navbar";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {

    return (
        <>
            <header className={`w-full ${header} z-10 relative`}>
                <Navbar />
            </header>
            <Toaster />
            <main className={`w-full `} >{children}</main> {/* Ajustar el margen superior */}
            <footer className="w-full h-18 bg-flavor-1 text-center text-white p-5 flex justify-around items-center">
                <div>
                    <p className="text-sm">Hecho con <span className="text-red-500">♥</span> por:
                        <a className="text-sm hover:border-b" href="http://mateopereira.vercel.app" target="_blank" rel="noopener noreferrer">Mateo Pereira</a>
                        <span className="text-sm"> y </span>
                        <a className="text-sm hover:border-b" href="https://portafolio-jeronimo-cardona.vercel.app" target="_blank" rel="noopener noreferrer">Jeronímo Cardona</a>
                    </p>
                </div>
                <p>© {new Date().getFullYear()} todos los derechos reservados</p>
            </footer>
        </>
    )
}

export default Layout