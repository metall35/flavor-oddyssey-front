import { useAuthStore } from '@/hooks/useStore';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, useEffect, useRef } from 'react';

const AvatarUser = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { logout } = useAuthStore();
    const menuRef = useRef(null);

    const handleLogout = () => {
        logout();
        router.push('/').then(() => {
            router.reload();
        });
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleProfile = () => {
        router.push('/perfil');
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative inline-block" ref={menuRef}>
            <Image
                src={user.photo}
                alt="User Avatar"
                width={48}
                height={48}
                loading="lazy"
                autoFocus
                className="w-12 h-12 rounded-full cursor-pointer"
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
                            onClick={handleLogout}
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