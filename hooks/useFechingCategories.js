// hooks/useFetchCategories.js
import { useQuery } from '@apollo/client';
import { useCategoryAndFoodStore } from './useStore';
import { CATEGORY_AND_FOOD_QUERY } from '@/graphql/CATEGORY-AND-FOOD-QUERY';

export const useFetchCategories = () => {
    const { setData, categories } = useCategoryAndFoodStore();
    useQuery(CATEGORY_AND_FOOD_QUERY, {
        skip: categories.length > 0 ,
        onCompleted: (data) => {
            setData(data);
        },
        onError: (error) => {
            console.error("Error fetching categories:", error);
        },
    });
};