import { FaCaretRight } from "react-icons/fa";

const SlideNav = ({ onNavigate, section }) => {
    const links = [
        { name: "Información personal", path: "informacion-personal" },
        { name: "Recetas creadas", path: "recetas" },
        { name: "Recetas guardadas", path: "likes" },
    ];

    return (
        <aside className="md:block md:w-1/4 w-full border-b md:border-b-0 md:border-r border-gray-400 md:px-4 pb-4">
            <ul className="text-lg font-medium space-y-10">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className="hover:text-flavor-2 cursor-pointer flex items-center w-full justify-between"
                        onClick={() => onNavigate(link.path)}
                    >
                        {link.name} {link.path == section && <FaCaretRight size={20} className="fill-gray-400 rotate-90 md:rotate-0" />}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default SlideNav;