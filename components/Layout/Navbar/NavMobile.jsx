import Link from "next/link";
import ButtonLogIn from "./ButtonLogIn";
import ButtonRegister from "./ButtonRegister";

const NavMobile = ({ isOpen, isAnimating, toggleMenu, items, user }) =>
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
                {
                    user ? (
                        <div className="w-full my-2 flex justify-between items-center">
                            <p className="text-xl max-w-1/2 truncate">Hola, {user.username}</p>
                            <div className="flex gap-4">
                            <Link href="/perfil" className="py-2 px-6 border-2 border-flavor-2 rounded-lg hover:bg-flavor-2 hover:text-white">Perfil</Link>
                            <Link href="/" className="py-2 px-1 border-2 border-gray-400 rounded-lg hover:bg-gray-400 hover:text-white">Cerrar sesión</Link>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full my-2 flex justify-between">
                            <ButtonLogIn />
                            <ButtonRegister />
                        </div>
                    )
                }
            </div>
        </div>
    );

export default NavMobile;
