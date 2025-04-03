import { gql } from "@apollo/client";
import { ALL_DETAILS_RECIPE_FRAGMENT } from "./fragments/COMPOUND-FRAGMENTS";
import { BASIC_DETAILS_RECIPE_FRAGMENT } from "./fragments/BASIC-FRAGMENTS";


export const SINGLE_RECIPE_QUERY = gql`
    query getReceta($id: UUID!) {
        getReceta(recetaId: $id) {
            recipe {
                ...AllDetailsRecipe
            }
            suggest {
                ...BasicDetailsRecipe
            }
        }
    }


${BASIC_DETAILS_RECIPE_FRAGMENT}
${ALL_DETAILS_RECIPE_FRAGMENT}
`