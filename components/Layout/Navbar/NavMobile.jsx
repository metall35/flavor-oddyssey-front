import Link from "next/link";
import ButtonLogIn from "./ButtonLogIn";
import ButtonRegister from "./ButtonRegister";

const NavMobile = ({ isOpen, isAnimating, toggleMenu, items }) =>
    (isOpen || isAnimating) && (
        <div className={`z-20 w-full flex justify-center ${isAnimating ? 'animate-slide-up' : 'animate-slide-down'}`} >
            <div className="bg-white rounded-2xl p-4 w-11/12 shadow-md">
                <ul className="flex flex-col font-medium border-b-2 p-1">
                    {items.slice(0, 3).map((item, index) => (
                        <li key={index} className="my-3 w-full">
                            <Link href={item.href} className="hover:text-flavor-2 w-full block" onClick={toggleMenu}>{item.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className="w-full my-2 flex justify-between">
                    <ButtonLogIn />
                    <ButtonRegister />
                </div>
            </div>
        </div>
    );

export default NavMobile;
