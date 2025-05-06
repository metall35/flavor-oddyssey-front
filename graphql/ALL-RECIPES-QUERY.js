import { gql } from "@apollo/client";
import { BASIC_DETAILS_RECIPE_FRAGMENT } from "./fragments/BASIC-FRAGMENTS";


export const ALL_RECIPES_QUERY = gql`
    query {
        recetas (searchs: []) {
            ...BasicDetailsRecipe
        }
    }


    ${BASIC_DETAILS_RECIPE_FRAGMENT}
`