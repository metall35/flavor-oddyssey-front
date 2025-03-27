import { FaCaretRight } from "react-icons/fa";

const SlideNav = ({ onNavigate, section }) => {
    const links = [
        { name: "Información personal", path: "informacion-personal" },
        { name: "Recetas creadas", path: "recetas" },
        { name: "Recetas guardadas", path: "likes" },
    ];

    return (
        <aside className="hidden md:block w-1/4 border-r border-gray-400 px-4">
            <ul className="text-lg font-medium space-y-10">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className="hover:text-flavor-2 cursor-pointer flex items-center w-full justify-between"
                        onClick={() => onNavigate(link.path)}
                    >
                        {link.name} {link.path == section && <FaCaretRight size={20} className="fill-gray-400" />}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SlideNav;