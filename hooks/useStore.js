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


export const useCategoryAndFoodStore = create(set => ({
    categories: [],
    foods: [],
    setData: data => set({ categories: data.categorias, foods: data.ingredientes })
}));


export const useSearchStore = create(set => ({
    searchValue: "",
    filtersValue: {
        categoryValue: "",
        time: "",
        difficulty: "",
        ingredients: []
    },
    setSearchValue: value => set({ searchValue: value }),
    setFiltersValue: (updater) =>
        set((state) => ({
            filtersValue: typeof updater === "function"
                ? updater(state.filtersValue) // Si es función, ejecútala
                : updater, // Si es objeto, úsalo directamente
        })),

}))