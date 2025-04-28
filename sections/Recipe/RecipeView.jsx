import Loader from "@/components/AuxComponents/Loader";
import dynamic from "next/dynamic";

const RecipeSection = dynamic(() => import('./RecipeSection'), {
    ssr: false,
    loading: () => <Loader />
});

const RecipeComments = dynamic(() => import('./RecipeComments'), {
    ssr: false,
    loading: () => <Loader />
});

const SuggestRecipes = dynamic(() => import('./SuggestRecipes'), {
    ssr: false,
    loading: () => <Loader />
});

const RecipeView = ({ data }) => {
    
    return (
        <section className="w-full">
            <RecipeSection data={data.recipe} />
            <div className="flex w-full flex-col md:flex-row my-10">
                <RecipeComments initialData={data.recipe.comentarios} id={data.recipe.id} />
                <SuggestRecipes data={data.suggest} />
            </div>
        </section>
    )
}

export default RecipeView