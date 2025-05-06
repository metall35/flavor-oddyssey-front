import Cookies from "js-cookie";
import { create } from "zustand";

const cookieTokenName = process.env.COOKIETOKEN; // Obtiene el nombre del token desde el .env

export const useIntersectionStore = create((set) => ({
    targetRef: null,
    isVisible: false,
    setTargetRef: (ref) => set({ targetRef: ref }),
    setIsVisible: (visible) => set({ isVisible: visible }),
}));


export const useUserData = create(set => ({
    user: null,
    setUser: user => set({ user })
}))

export const useAuthStore = create((set) => ({
    isAuthenticated: false,

    login: (token) => {
        Cookies.set(cookieTokenName, token, { expires: 1 / 24 });
        set({ isAuthenticated: true });
    },

    logout: () => {
        Cookies.remove(cookieTokenName);
        set({ isAuthenticated: false });
    },

    checkAuth: () => {
        const token = Cookies.get(cookieTokenName);
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