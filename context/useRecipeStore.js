import { create } from "zustand";

export const useRecipeStore = create((set) => ({
    isIngredientsModalOpen: false,
    recipe: {
        title: "Título de la receta",
        description: "Agrega una descripción...",
        time: 0,
        difficulty: "",
        category: "",
        ingredients: [],
        steps: [],
        photo: null,
    },
    getInitialValues: () => ({
        title: "Título de la receta",
        description: "Agrega una descripción...",
        time: 0,
        difficulty: "",
        category: "",
        ingredients: [],
        steps: [],
        photo: null,
    }),
    openIngredientsModal: () => set({ isIngredientsModalOpen: true }),
    closeIngredientsModal: () => set({ isIngredientsModalOpen: false }),
    updateRecipe: (newData) => set((state) => ({ recipe: { ...state.recipe, ...newData } })),
    addIngredient: (ingredient) =>
        set((state) => ({
            recipe: {
                ...state.recipe,
                ingredients: [...state.recipe.ingredients, ingredient],
            },
        })),
    addStep: (step) =>
        set((state) => ({
            recipe: {
                ...state.recipe,
                steps: [...state.recipe.steps, step],
            },
        })),
    resetRecipe: () =>
        set({
            recipe: {
                title: "Título de la receta",
                description: "Agrega una descripción...",
                time: 0,
                difficulty: "",
                category: "",
                ingredients: [],
                steps: [],
                photo: null,
            },
        }),
}));