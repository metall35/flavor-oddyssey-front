import { TitleH2 } from "@/components/AuxComponents/Title";
import WideCard from "@/components/Cards/WideCard";


const UserRecipes = ({ recipes, title }) => {
    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full mb-10">
                <TitleH2 text={title} classes="text-start" />
            </div>
            {
                recipes?.length === 0 && (
                    <div className="w-full text-center text-lg">No tienes recetas publicadas</div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {recipes?.map((recipe) => (
                    <WideCard key={recipe.id} data={recipe} />
                ))}
            </div>
        </section>
    )
}

export default UserRecipes;