import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useSyncStorage } from "./useSyncStorage";
import { useCategoryAndFoodStore, useSearchStore } from "./useStore";
import { useFetchCategories } from "./useFechingCategories";
import toast from "react-hot-toast";

// Custom hook to manage search functionality
const useSearch = () => {
    // State and store hooks for managing search and filters
    const { filtersValue, searchValue, setFiltersValue, setSearchValue } = useSearchStore();
    const router = useRouter();
    const [searchHistory, setSearchHistory] = useSyncStorage("searchHistoryFlavor", []);
    const { categories, foods } = useCategoryAndFoodStore();

    // Fetch categories when the component using this hook is mounted
    useFetchCategories();


    // Function to handle changes in the search input
    const onChangeSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);

        // Clear error if the input value is valid
        // if (value.length > 1 && error.status) {
        //     setError({ status: false, message: "" });
        // }
    };

    // Memoized options for categories dropdown
    const categoriesOptions = useMemo(() =>
        categories.map(category => ({
            value: category.id,
            label: category.name
        })),
        [categories]
    );

    // Memoized options for foods dropdown
    const foodOptions = useMemo(() =>
        foods.map(food => ({
            value: food.id,
            label: food.name
        })),
        [foods]
    );

    const viewIngredients = useMemo(() => {
        return filtersValue.ingredients.length > 0
            ? foods.filter((food) => filtersValue.ingredients.includes(String(food.id)))
            : [];
    }, [filtersValue.ingredients, foods]);

    // Function to handle the search submission
    const handleSearch = async (e) => {
        e.preventDefault();

        // Validate search input
        // if (!searchValue.trim() && (!filtersValue.categoryValue || !filtersValue.time || !filtersValue.difficulty || !filtersValue.ingredients)) {
        //     toast.error("No has ingresado ningún dato.")
        //     return;
        // }

        // Navigate to the search results page with the query
        await router.push({
            pathname: "/search",
            query: { q: searchValue, filters: JSON.stringify(filtersValue) }
        });

        // Update search history if the value is not already present
        if (!searchHistory?.includes(searchValue)) {
            setSearchHistory(prev => prev ? [...prev, searchValue] : [searchValue]);
        }
    };

    // Debugging logs for filters and search values
    // console.log("filterValue:", filtersValue, "searchValue: ", searchValue);

    // Return all necessary values and functions for the consuming component
    return {
        searchValue,
        onChangeSearch,
        handleSearch,
        filtersValue,
        setFiltersValue,
        categoriesOptions,
        foodOptions,
        viewIngredients
    };
};

export default useSearch;