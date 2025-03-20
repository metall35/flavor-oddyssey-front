import { create } from "zustand";

export const useIntersectionStore = create((set) => ({
    targetRef: null,
    isVisible: false,
    setTargetRef: (ref) => set({ targetRef: ref }),
    setIsVisible: (visible) => set({ isVisible: visible }),
}));