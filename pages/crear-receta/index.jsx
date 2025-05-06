import dynamic from "next/dynamic";
import Loader from "@/components/AuxComponents/Loader";

const CreateRecipeView = dynamic(() => import("@/sections/CreateRecipe/CreateRecipeView"), {
    ssr: false,
    loading: () => <Loader />,
});

const CreateRecipePage = () => {
    return (
        <>
            <CreateRecipeView />
        </>
    )
}

export default CreateRecipePage