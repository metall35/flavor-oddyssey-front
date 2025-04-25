import { useRecipeStore } from "@/context/useRecipeStore";
import { useState } from "react";
import toast from "react-hot-toast";

const AddSteps = () => {

    const steps = useRecipeStore((state) => state.recipe.steps)
    const setSteps = useRecipeStore((state) => state.addStep)


    const [currentStep, setCurrentStep] = useState("")
    const [isEditing, setIsEditing] = useState(false)


    const handleBlur = () => {
        setIsEditing(false);
        if (currentStep.trim() !== "") {
            setSteps(currentStep)
            setCurrentStep("");
        } else {
            toast.error("Por favor completa el paso antes de guardar.");
        }
    };

    return (
        <div className="mt-2">
            <h3 className="text-xl mt-4 mb-4">Pasos a seguir</h3>
            <ol className="list-decimal text-sm px-6 mb-2 w-full">
                {steps.map((step, i) => (
                    <li key={i}>{step}</li>
                ))}
                {isEditing ? (
                    <li>
                        <textarea
                            type="text"
                            value={currentStep}
                            onChange={(e) => setCurrentStep(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    handleBlur();
                                }
                            }}
                            onBlur={handleBlur}
                            autoFocus
                            className="text-sm max-w-full focus:outline-none field-sizing-content resize-none"
                        />
                    </li>
                ) : (
                    <li className="text-sm text-black/40 hover:text-flavor-1 cursor-pointer" onClick={() => setIsEditing(true)}>Agregar paso</li>
                )}
            </ol>

        </div>
    )
}

export default AddSteps