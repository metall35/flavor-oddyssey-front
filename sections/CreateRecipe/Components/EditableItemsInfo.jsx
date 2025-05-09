import Input from "@/components/FormInputs/Input";
import CustomSelect from "@/components/FormInputs/Select";
import { useRecipeStore } from "@/context/useRecipeStore";
import { useCategoryAndFoodStore } from "@/hooks/useStore";
import { useMemo } from "react";


const EditableItemsInfo = () => {

    const items = useRecipeStore(state => state.recipe);
    const setItems = useRecipeStore(state => state.updateRecipe);

    const { categories } = useCategoryAndFoodStore();

    const categoriesOptions = useMemo(() =>
        categories.map(category => ({
            value: category.id,
            label: category.name
        })),
        [categories]
    );

    return (
        <div className="w-full h-20 grid grid-cols-3 lg:gap-8 md:gap-4 gap-8 items-center text-black my-2">
            <Input
                name="time"
                label="Tiempo"
                type="number"
                value={items.time}
                onChange={e =>
                    setItems({
                        time: e.target.value
                    })}
                error={{ status: false }}
            />
            <CustomSelect
                label={"Dificultad"}
                name={"dificulty"}
                value={items.difficulty}
                onChange={value =>
                    setItems({
                        difficulty: value
                    })}
                options={[
                    { label: "Fácil", value: "Fácil" },
                    { label: "Intermedio", value: "Intermedio" },
                    { label: "Difícil", value: "Difícil" },
                ]}
            />
            <CustomSelect
                label={"Categorias"}
                name={"category"}
                value={items.category}
                onChange={value =>
                    setItems({
                        category: value
                    })}
                options={categoriesOptions}
            />
        </div>
    )
}

export default EditableItemsInfo