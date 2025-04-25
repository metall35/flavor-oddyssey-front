import { useRecipeStore } from "@/context/useRecipeStore"

const AddIngredients = () => {
    const ingredients = useRecipeStore((state) => state.recipe.ingredients)
    const openModal = useRecipeStore((state) => state.openIngredientsModal)

    return (
        <>
            <h3 className="text-xl mt-4 mb-4">Ingredientes</h3>
            <ul className="list-disc text-sm px-6 grid grid-cols-2 w-full font-light">
                {ingredients.map((ingredient) => (
                    <li key={ingredient.ingredienteId}>
                        {ingredient.name} <span>{ingredient.cantidad} {ingredient.medida}</span>
                    </li>
                ))}
                <li className="text-sm text-black/40 hover:text-flavor-1 cursor-pointer" onClick={openModal}>
                    Agregar ingrediente
                </li>
            </ul>
        </>
    )
}

export default AddIngredients