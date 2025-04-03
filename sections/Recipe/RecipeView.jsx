import RecipeComents from "./RecipeComents"
import RecipeSection from "./RecipeSection"
import SuggestRecipes from "./SuggestRecipes"


const RecipeView = ({ data }) => {
    console.log(data);
    
    return (
        <section className="w-full">
            <RecipeSection data={data.recipe} />
            <div className="flex w-full flex-col md:flex-row my-10">
                <RecipeComents data={data.recipe.comentarios} />
                <SuggestRecipes data={data.suggest} />
            </div>
        </section>
    )
}

export default RecipeView