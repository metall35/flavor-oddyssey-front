// import { USER_PERFIL_QUERY } from "@/graphql/fragments/USER-QUERY";
import { useQuery } from "@apollo/client";
import Cookies from "js-cookie";
import { create } from "zustand";

export const useIntersectionStore = create((set) => ({
    targetRef: null,
    isVisible: false,
    setTargetRef: (ref) => set({ targetRef: ref }),
    setIsVisible: (visible) => set({ isVisible: visible }),
}));

export const useAuthStore = create((set) => ({
    refetch: null,
    setRefetch: (refetch) => set({ refetch }), // Método para establecer refetch
    token: Cookies.get("tokenFlavorOdyssey"), // Maneja solo el token en el store
}));