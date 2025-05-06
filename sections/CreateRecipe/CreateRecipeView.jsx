import Container from "@/components/Sections/Container"
import GeneralButton from "@/components/Buttons/GeneralButton";
import AddIngredients from "./Components/AddIngredients";
import AddSteps from "./Components/AddSteps";
import EditableItemsInfo from "./Components/EditableItemsInfo";
import EditableDescription from "./Components/EditableDescription";
import EditableTitle from "./Components/EditableTitle";
import useCreateRecipe from "@/hooks/useCreateRecipe";
import EdtiableImage from "./Components/EditableImage";
import dynamic from "next/dynamic";
import Loader from "@/components/AuxComponents/Loader";

const AddIngredientsModal = dynamic(() => import("./Components/AddIngredientsModal"), {
    ssr: false,
    loading: () => <Loader />,
});


const CreateRecipeView = () => {
    
    const {handleSubmit} = useCreateRecipe()


    return (
        <Container className="flex md:flex-row flex-col gap-8 mb-10" >
            <EdtiableImage />
            <form className="md:w-6/12 lg:w-6/12 w-full" onSubmit={handleSubmit}>
                <EditableTitle />
                <EditableDescription />
                <EditableItemsInfo />
                <AddIngredients />
                <AddSteps />
                <GeneralButton
                    classes="bg-flavor-2 flex-1 w-full mt-5 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300"
                    text="Guardar"
                />
            </form>
            <AddIngredientsModal  />
        </Container>
    )


}

export default CreateRecipeView