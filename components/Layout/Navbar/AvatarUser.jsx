import { useState } from 'react';

const AvatarUser = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative inline-block">
            <img
                src={user.photo} // Reemplaza con la ruta de la imagen del avatar
                alt="User Avatar"
                className="w-12 h-12 rounded-full cursor-pointer "
                onClick={toggleMenu}
            />
            {isMenuOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg z-50 p-2">
                    <ul className="list-none m-0 p-0">
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => alert('Ir al perfil')}
                        >
                            Perfil
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => alert('Cerrar sesión')}
                        >
                            Cerrar sesión
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AvatarUser;