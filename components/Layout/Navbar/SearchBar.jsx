import Search from "@/components/Controls/Search";
import CustomSelect from "@/components/FormInputs/Select";
import useSearch from "@/hooks/useSearch";
import { memo } from "react";

const MemoizedCustomSelect = memo(CustomSelect);

const SearchBar = ({ isVisibleSearch }) => {
    const {
        categoriesOptions,
        foodOptions,
        filtersValue,
        setFiltersValue,
        viewIngredients
    } = useSearch()

    return (
        <>
            {isVisibleSearch && (
                <div className="w-full bg-white animate-slide-down shadow-md p-5 flex justify-between flex-wrap-reverse border ">
                    <div className="md:w-1/2 w-full">
                        <p>filtros:</p>
                        <div className="flex justify-start items-center gap-2">
                            <MemoizedCustomSelect
                                label={"Categorias"}
                                name={"category"}
                                value={filtersValue.categoryValue}
                                onChange={value =>
                                    setFiltersValue({
                                        ...filtersValue,
                                        categoryValue: value
                                    })}
                                options={categoriesOptions}
                            />
                            <MemoizedCustomSelect
                                label={"Tiempo (minutos)"}
                                name={"time"}
                                value={filtersValue.time}
                                onChange={value =>
                                    setFiltersValue({
                                        ...filtersValue,
                                        time: value
                                    })}
                                options={[
                                    { label: "menos de 10", value: 10 },
                                    { label: "menos de 20", value: 20 },
                                    { label: "menos de 30", value: 30 },
                                    { label: "menos de 60", value: 60 },
                                    { label: "más de 60", value: 100 },
                                ]}
                            />
                            <MemoizedCustomSelect
                                label={"Dificultad"}
                                name={"dificulty"}
                                value={filtersValue.difficulty}
                                onChange={value =>
                                    setFiltersValue({
                                        ...filtersValue,
                                        difficulty: value
                                    })}
                                options={[
                                    { label: "Fácil", value: "Fácil" },
                                    { label: "Intermedio", value: "Intermedio" },
                                    { label: "Difícil", value: "Difícil" },
                                ]}
                            />
                            <MemoizedCustomSelect
                                label={"Ingredientes"}
                                name={"ingredients"}
                                value=""
                                onChange={(value) =>
                                    setFiltersValue((prev) => ({
                                        ...prev,
                                        ingredients: prev.ingredients.includes(value)
                                            ? prev.ingredients.filter(item => item !== value)
                                            : [...prev.ingredients, value],
                                    }))
                                }
                                options={foodOptions}
                            />
                        </div>

                    </div>
                    <div className="md:w-1/2 w-full block">
                        <Search />
                        <div className="flex gap-4 flex-wrap mt-4 ml-2">
                            {viewIngredients.map(ingredient => (
                                <span key={ingredient.id} className="flex items-center gap-1 rounded-full py-1 px-2 border text-sm">
                                    {ingredient.name}
                                    <button
                                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                                        onClick={() =>
                                            setFiltersValue((prev) => ({
                                                ...prev,
                                                ingredients: prev.ingredients.filter(item => item !== ingredient.id),
                                            }))}
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchBar;
