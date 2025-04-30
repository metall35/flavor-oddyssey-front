import { useRecipeStore } from "@/context/useRecipeStore"

const AddIngredients = () => {
    const ingredients = useRecipeStore((state) => state.recipe.ingredients)
    const openModal = useRecipeStore((state) => state.openIngredientsModal)
    const removeIngredient = useRecipeStore((state) => state.removeIngredient)

    return (
        <>
            <h3 className="text-xl mt-4 mb-4">Ingredientes</h3>
            <ul className="list-none text-sm px-6 grid grid-cols-2 w-full font-light">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredienteId} className="w-full hover:bg-white/60 rounded-md p-2 flex items-center justify-between group transition-all duration-200">
                        {ingredient.name} <p>{ingredient.cantidad} {ingredient.medida} </p>
                        <span className="text-gray-400 hover:text-red-500 cursor-pointer" onClick={() => removeIngredient(ingredient.ingredienteId)}>x</span>
                    </li>
                ))}
                <li className="text-sm text-black/40 hover:text-flavor-1 cursor-pointer mt-2" onClick={openModal}>
                    Agregar ingrediente
                </li>
            </ul>
        </>
    )
}

export default AddIngredients