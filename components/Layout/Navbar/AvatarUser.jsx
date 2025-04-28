import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AvatarUser = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfile = () => {
        router.push('/perfil');
    }

    return (
        <div className="relative inline-block">
            <Image
                src={user.photo}
                alt="User Avatar"
                width={48}
                height={48}
                loading='lazy'
                className="w-12 h-12 rounded-full cursor-pointer "
                onClick={toggleMenu}
            />
            {isMenuOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg z-50 p-2 w-40">
                    <ul className="list-none m-0 p-0">
                        <li>
                            <p className="px-4 py-2 truncate font-medium">Hola, {user.username}</p>
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-xl text-md"
                            onClick={handleProfile}
                        >
                            Perfil
                        </li>
                        <li
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-2xl text-md"
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