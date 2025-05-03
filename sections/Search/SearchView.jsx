import Loader from "@/components/AuxComponents/Loader";
import CustomSelect from "@/components/FormInputs/Select";
import Container from "@/components/Sections/Container";
import useSearch from "@/hooks/useSearch";
import dynamic from "next/dynamic";
import { memo } from "react";

const AllRecipesView = dynamic(() => import('@/sections/AllRecipes/AllRecipesView'), {
    ssr: false,
    loading: () => <Loader />
});

const MemoizedCustomSelect = memo(CustomSelect);

const SearchView = ({ result }) => {
    const {
        categoriesOptions,
        foodOptions,
        filtersValue,
        setFiltersValue,
    } = useSearch()


    return (
        <>
            <Container className="">
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
            </Container>
            {
                result.search.length == 0 ? (
                    <div className="w-full h-[calc(100vh-280px)] flex justify-center py-5">
                        <p className=""> No se encontraron resultados. </p>
                    </div>
                ) : (
                    <AllRecipesView data={result.search} title={`Resultados (${result.search.length})`} />
                )
            }
        </>
    )
}

export default SearchView