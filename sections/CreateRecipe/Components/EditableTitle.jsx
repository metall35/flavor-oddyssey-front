import { TitleH2 } from "@/components/AuxComponents/Title";
import { useRecipeStore } from "@/context/useRecipeStore";
import { useState } from "react";


const EditableTitle = () => {
    const [isEditing, setIsEditing] = useState(false);

    const title = useRecipeStore((state) => state.recipe.title)
    const setTitle = useRecipeStore((state) => state.updateRecipe)

    return (
        <>
            {isEditing ? (
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle({ title: e.target.value })}
                    onBlur={() => setIsEditing(false)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            setIsEditing(false)
                        }
                    }}
                    autoFocus
                    maxLength={50}
                    className="md:text-4xl w-full text-3xl focus:outline-none"
                />
            ) : (
                <TitleH2 text={title} onDoubleClick={() => setIsEditing(true)} classes={`${title == "Título de la receta" ? "text-black/30" : ""}`} />
            )}
        </>
    );
};

export default EditableTitle