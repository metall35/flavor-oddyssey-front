import { useRecipeStore } from "@/context/useRecipeStore";
import { useState } from "react"

const EditableDescription = () => {
    // const [description, setDescription] = useState('agrega una descripción...');
    const [isEditing, setIsEditing] = useState(false);

    const description = useRecipeStore((state) => state.recipe.description)
    const setDescription = useRecipeStore((state) => state.updateRecipe)


    return (
        <>
            {isEditing ? (
                <textarea
                    type="text"
                    value={description}
                    onChange={e => setDescription({ description: e.target.value })}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            setIsEditing(false)
                        }
                    }}
                    autoFocus
                    className="text-sm my-2 max-w-full focus:outline-none field-sizing-content resize-none"
                />
            ) : (
                < p className={`text-sm my-2 lg:max-w-[460px] ${description == "Agrega una descripción..." ? "text-black/30" : ""}`} onDoubleClick={() => setIsEditing(true)} >{description}</p>
            )}
        </>
    );
};

export default EditableDescription;