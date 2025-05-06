import { TitleH2 } from "@/components/AuxComponents/Title";
import GeneralButton from "@/components/Buttons/GeneralButton";
import Input from "@/components/FormInputs/Input";
import CustomSelect from "@/components/FormInputs/Select";
import { useRecipeStore } from "@/context/useRecipeStore";
import { useCategoryAndFoodStore } from "@/hooks/useStore";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";


const AddIngredientsModal = () => {
    const [items, setItems] = useState({
        ingredient: null,
        cantidad: "",
        medida: ""
    });

    const isOpen = useRecipeStore((state) => state.isIngredientsModalOpen);
    const handleClose = useRecipeStore((state) => state.closeIngredientsModal);
    const addIngredient = useRecipeStore((state) => state.addIngredient);


    const { foods } = useCategoryAndFoodStore();

    const FoodOptions = useMemo(() =>
        foods.map(food => ({
            value: food.id,
            label: food.name,
            data: { ingredientId: food.id, name: food.name }
        })),
        [foods]
    );

    const handleIngredientChange = (selected) => {
        setItems({
            ...items,
            ingredient: selected
        });
    };

    const handleSave = () => {
        if (items.ingredient && items.cantidad && items.medida) {
            addIngredient({
                ingredienteId: items.ingredient.ingredientId,
                name: items.ingredient.name,
                cantidad: Number(items.cantidad),
                medida: items.medida
            })
            setItems({
                ingredient: null,
                cantidad: "",
                medida: ""
            });
            handleClose();
        } else {
            toast.error("Por favor completa todos los campos antes de guardar.");
        }
    }

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[20]" onClick={handleClose}>
                    <div className="relative bg-background lg:w-4/12 md:w-6/12 p-10 rounded-2xl" onClick={(e) => e.stopPropagation()}>
                        <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500 cursor-pointer" onClick={handleClose}>
                            <IoMdClose size={25} />
                        </button>
                        <TitleH2 text="Agregar ingredientes" classes="text-center mb-10" />
                        <div className="flex flex-col w-full gap-4">
                            <CustomSelect
                                label={"Ingredientes"}
                                name={"ingredients"}
                                value={items.ingredient?.ingredientId || ""}
                                onChange={handleIngredientChange}
                                options={FoodOptions}
                            />
                            <Input
                                name="cantidad"
                                label="Cantidad"
                                type="number"
                                value={items.cantidad || ""}
                                onChange={e =>
                                    setItems({
                                        ...items,
                                        cantidad: e.target.value
                                    })
                                }
                                error={{ status: false }}
                            />
                            <CustomSelect
                                label={"Medida"}
                                name={"measure"}
                                value={items.medida || ""}
                                onChange={value =>
                                    setItems({
                                        ...items,
                                        medida: value
                                    })}
                                options={[
                                    { label: "Gramos", value: "gr" },
                                    { label: "Mililitros", value: "ml" },
                                    { label: "Unidades", value: "u" },
                                ]}
                            />
                            <GeneralButton
                                classes="bg-flavor-2 flex-1 w-full mt-5 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300"
                                text="Guardar"
                                onClick={handleSave}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddIngredientsModal