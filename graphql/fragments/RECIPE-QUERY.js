import { gql } from "@apollo/client";

export const DETAILS_RECIPE_FRAGMENT = gql`
    fragment DetailsRecipe on RecetaType {
            id
            name
            description
        }

`