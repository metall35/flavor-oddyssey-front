import { USER_PERFIL_QUERY } from "@/graphql/fragments/USER-QUERY";
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
    get user() {
        try {
            const result = useQuery(USER_PERFIL_QUERY);
            return result.data.currentUser;
        } catch (error) {
            return null;
        }
    },

    get token() {
        return Cookies.get("tokenFlavorOdyssey");
    },
}));