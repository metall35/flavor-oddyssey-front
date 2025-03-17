import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }) => {

    return (
        <div className="h-screen grid grid-rows-[auto,1fr,auto]">
            <header className="w-full">
                <Navbar />
            </header>
            <main className={`w-full mt-[70px] lg:px-26 md:px-12 px-4`} >{children}</main> {/* Ajustar el margen superior */}
            <footer>
            </footer>
        </div>
    )
}

export default Layout