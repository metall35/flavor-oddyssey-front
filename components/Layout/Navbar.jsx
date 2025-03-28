import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import useIntersectionOberserver from "@/hooks/useIntersectionObserver";
import Logo from "./Navbar/Logo";
import NavDesktop from "./Navbar/NavDesktop";
import NavMobile from "./Navbar/NavMobile";
import SearchBar from "./Navbar/SearchBar";
import ButtonRegister from "./Navbar/ButtonRegister";
import AvatarUser from "./Navbar/AvatarUser";
import { useUser } from "@/hooks/useUser";



const Navbar = () => {
    const { isVisible: isVisibleSearch } = useIntersectionOberserver();
    const { data: user } = useUser(); // Obtén el usuario usando el nuevo hook
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const items = [
        { name: "Inicio", href: "/" },
        { name: "Recetas", href: "/recipes" },
        { name: "Planea tu menú", href: "/menu" },
        { name: user ? <AvatarUser user={user} /> : <ButtonRegister />, href: user ? "" : "/login" },
    ]

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
                <Logo />
                <NavDesktop items={items} />
                <button className="sm:hidden cursor-pointer" onClick={toggleMenu}>
                    {isOpen ? <RxCross1 size={40} /> : <RxHamburgerMenu size={40} />}
                </button>
            </nav>
            <NavMobile isOpen={isOpen} isAnimating={isAnimating} toggleMenu={toggleMenu} items={items} user={user} />
            <SearchBar isVisibleSearch={isVisibleSearch} />
        </>
    );
};

export default Navbar;