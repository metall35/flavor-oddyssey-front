import { gql } from "@apollo/client";

export const BASIC_DETAILS_RECIPE_FRAGMENT = gql`
    fragment BasicDetalisRecipe on RecetaType {
        image
        name
        id
        time
        difficulty
    }
`
export const ALL_DETAILS_RECIPE_FRAGMENT = gql`
    fragment AllDetalisRecipe on RecetaType {
        ...BasicDetailRecipe
    }

    ${BASIC_DETAILS_RECIPE_FRAGMENT}
`