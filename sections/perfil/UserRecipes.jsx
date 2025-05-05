import { TitleH2 } from "@/components/AuxComponents/Title";
import WideCard from "@/components/Cards/WideCard";
import useUserRecipe from "@/hooks/useUserRecipe";
import { useState } from "react";
import { IoTrashOutline, IoEye } from "react-icons/io5";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Loader from "@/components/AuxComponents/Loader";

const UserRecipes = ({ recipes, title }) => {
    const [isTouched, setIsTouched] = useState(false)
    const { handleDelete, handleView, handleEdit, loading } = useUserRecipe()

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
                    <div className="group relative" key={recipe.id}>
                        <WideCard data={recipe} />
                        <div
                            className={`absolute rounded-lg inset-0 bg-black/60 opacity-0 transition-opacity hover:opacity-100 ${isTouched ? 'opacity-100' : 'opacity-0'} duration-500 flex flex-col justify-center p-4 gap-2`}
                            onTouchStart={() => setIsTouched(true)}
                            onTouchEnd={() => setIsTouched(false)}
                            onTouchCancel={() => setIsTouched(false)}
                        >
                            <div className="flex justify-center p-4 gap-4">
                                <IoEye size={30} className="text-white/70 cursor-pointer hover:text-white" onClick={() => handleView({ recipeId: recipe.id, recipeName: recipe.name })} />
                                {loading
                                    ? <Loader /> 
                                    : <HiMiniPencilSquare size={30} className="text-white/70 cursor-pointer hover:text-blue-400" onClick={() => handleEdit({ idRecipe: recipe.id })} />
                                }
                                <IoTrashOutline size={30} className="text-white/70 cursor-pointer hover:text-red-600" onClick={() => handleDelete(recipe.id)} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default UserRecipes;