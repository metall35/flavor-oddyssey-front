import { useAuthStore } from './useStore';


const useRedirect = () => {
    const { isAuthenticated } = useAuthStore(); // Asume que tu store tiene esta propiedad

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