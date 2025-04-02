import { gql } from "@apollo/client";
import { ALL_DETAILS_RECIPE_FRAGMENT } from "./fragments/COMPOUND-FRAGMENTS";


export const SINGLE_RECIPE_QUERY = gql`
    query getReceta($id: UUID!) {
        getReceta(recetaId: $id) {
            ...AllDetailsRecipe
        }
    }



${ALL_DETAILS_RECIPE_FRAGMENT}
`