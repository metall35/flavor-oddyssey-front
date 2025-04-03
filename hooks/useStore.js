import Cookies from "js-cookie";
import { create } from "zustand";

export const useIntersectionStore = create((set) => ({
    targetRef: null,
    isVisible: false,
    setTargetRef: (ref) => set({ targetRef: ref }),
    setIsVisible: (visible) => set({ isVisible: visible }),
}));

// export const useAuthStore = create((set) => ({
//     refetch: null,
//     setRefetch: (refetch) => set({ refetch }), // Método para establecer refetch
//     token: Cookies.get("tokenFlavorOdyssey"), // Maneja solo el token en el store
// }));

export const useAuthStore = create((set) => ({
    isAuthenticated: false,

    login: (token) => {
        Cookies.set('tokenFlavorOdyssey', token, { expires: 1 / 24 });
        set({ isAuthenticated: true });
    },

    logout: () => {
        Cookies.remove('tokenFlavorOdyssey');
        set({ isAuthenticated: false });
    },

    checkAuth: () => {
        const token = Cookies.get('tokenFlavorOdyssey');
        set({ isAuthenticated: !!token });
    }
}));