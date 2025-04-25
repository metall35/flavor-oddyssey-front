import { useMutation } from "@apollo/client";
import useHandlePhotoChange from "./useHandlePhotoChange";
import { useRecipeStore } from "@/context/useRecipeStore";
import { CREATE_RECIPE_MUTATION } from "@/graphql/mutations/CREATE-RECIPE";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const useCreateRecipe = () => {
    const recipe = useRecipeStore((state) => state.recipe);
    const setRecipe = useRecipeStore((state) => state.updateRecipe);
    const initialValues = useRecipeStore((state) => state.getInitialValues);
    const resetRecipe = useRecipeStore((state) => state.resetRecipe);
    const router = useRouter();

    const { img, handlePhotoChange } = useHandlePhotoChange({
        initialPhoto: recipe.photo,
        updatePhoto: setRecipe,
        zustand: true
    });

    const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isUnchanged = (
            recipe.title === initialValues().title &&
            recipe.description === initialValues().description &&
            recipe.time === initialValues().time &&
            recipe.difficulty === initialValues().difficulty &&
            recipe.category === initialValues().category &&
            recipe.ingredients.length === 0 &&
            recipe.steps.length === 0 &&
            recipe.photo === null
        );

        if (isUnchanged) {
            toast.error("Debes modificar todos campos para crear la receta");
            return;
        }

        const payload = {
            name: recipe.title !== initialValues().title ? recipe.title : undefined,
            description: recipe.description !== initialValues().description ? recipe.description : undefined,
            time: recipe.time !== initialValues().time ? Number(recipe.time) : undefined,
            difficulty: recipe.difficulty !== initialValues().difficulty ? recipe.difficulty : undefined,
            category: recipe.category !== initialValues().category ? recipe.category : undefined,
            ingredientes: recipe.ingredients.length > 0
                ? recipe.ingredients.map(({ name, ...rest }) => rest)
                : undefined,
            pasos: recipe.steps.length > 0 ? recipe.steps : undefined,
            image: recipe.photo || undefined
        };

        try {
            await createRecipe({
                variables: { ...payload }
            });
            toast.success("Receta creada con éxito");
            resetRecipe();
            router.push("/perfil/recetas");

        } catch (error) {
            toast.error("Error al crear la receta: " + error.message);
        }
    };

    return {
        img,
        handlePhotoChange,
        handleSubmit
    };
};

export default useCreateRecipe