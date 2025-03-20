import Image from "next/image";
import Link from "next/link";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import GeneralButton from "../Buttons/GeneralButton";
import useIntersectionOberserver from "@/hooks/useIntersectionObserver";
import Search from "../Controls/Search";

const ButtonLogIn = () => <GeneralButton text="Iniciar sesión" classes="bg-gray-400 shadow-gray-400/50 hover:shadow-gray-500/50 hover:bg-gray-500 hover:scale-105 transition-transform duration-300 " />
const ButtonRegister = () => <GeneralButton text="Registrarse" classes="bg-flavor-2 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300 " />

const Navbar = () => {
    const { isVisible: isVisibleSearch } = useIntersectionOberserver()
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMenu = () => {
        if (isOpen) {
            setIsAnimating(true);
            setTimeout(() => {
                setIsOpen(false);
                setIsAnimating(false);
            }, 300); // Animation duration
        } else {
            setIsOpen(true);
        }
    };

    return (
        <>
            <nav className="navbar flex justify-between items-center lg:px-26 md:px-12 py-2 px-4 bg-white w-full shadow-md dark border-b-2">
                <figure className="flex gap-2 items-center p-1">
                    <Image
                        src="/logo-flavor.svg"
                        alt="recipe"
                        width={60}
                        height={60}
                        priority
                        placeholder="blur"
                        blurDataURL="/logo-flavor.svg"
                        className="h-auto aspect-square object-cover"
                    />
                    <span className="font-medium lg:text-4xl md:text-2xl sm:block hidden">flavor odyssey</span>
                </figure>
                <ul className="sm:flex gap-4 lg:text-lg md:text-md items-center font-medium hidden">
                    {["Inicio", "Recetas", "Planea tu menú", <GeneralButton text="Registrarse" classes="bg-flavor-2 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300 " />].map((item, index) => (
                        <li key={index}>
                            <Link href={"/"} className="hover:text-flavor-2">{item}</Link>
                        </li>
                    ))}
                </ul>
                <button className="sm:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <RxCross1 size={40} /> : <RxHamburgerMenu size={40} />}
                </button>
            </nav>
            {(isOpen || isAnimating) && (
                <div className={`z-20 w-full flex justify-center ${isAnimating ? 'animate-slide-up' : 'animate-slide-down'}`} >
                    <div className="bg-white rounded-2xl p-4 w-11/12 shadow-md">
                        <ul className="flex flex-col font-medium border-b-2 p-1">
                            {["Inicio", "Recetas", "Planea tu menú"].map((item, index) => (
                                <li key={index} className="my-3 w-full">
                                    <Link href={"/"} className="hover:text-flavor-2 w-full block" onClick={toggleMenu}>{item}</Link>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full my-2 flex justify-between">
                            <ButtonLogIn />
                            <ButtonRegister />
                        </div>
                    </div>
                </div>
            )}
            {isVisibleSearch && (
                <div className="w-full bg-white animate-slide-down shadow-md p-5 flex justify-between flex-wrap border ">
                    <div></div>
                    <div className="md:w-1/2 w-full block">
                        <Search />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;