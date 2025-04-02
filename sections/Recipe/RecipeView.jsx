import RecipeComents from "./RecipeComents"
import RecipeSection from "./RecipeSection"


const RecipeView = ({ data }) => {
    return (
        <section className="w-full">
            <RecipeSection data={data} />
            <div className="flex w-full flex-col md:flex-row">
                <RecipeComents data={data.comentarios} />
                <div className="md:w-1/2 w-full h-1"></div>
            </div>
        </section>
    )
}

export default RecipeView