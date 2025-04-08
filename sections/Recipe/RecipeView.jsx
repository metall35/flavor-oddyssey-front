import RecipeComments from "./RecipeComments"
import RecipeSection from "./RecipeSection"
import SuggestRecipes from "./SuggestRecipes"


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