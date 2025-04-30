import { useEffect } from 'react';
import { useAuthStore } from './useStore';


const useRedirect = () => {
    const { isAuthenticated, checkAuth } = useAuthStore(); 

    useEffect(() => {
        checkAuth(); // Verifica el estado de autenticación al cargar el hook
    }, [checkAuth]);


    const getRedirectPath = (destinationPath) => {
        if (!isAuthenticated) {
            // Si no está autenticado, devuelve ruta al login con returnUrl
            return `/login?returnUrl=${encodeURIComponent(destinationPath)}`;
        }
        // Si está autenticado, devuelve la ruta de destino directamente
        return destinationPath;
    };

    return { getRedirectPath };
}

export default useRedirect