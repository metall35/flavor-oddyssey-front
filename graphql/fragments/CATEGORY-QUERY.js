import { gql } from "@apollo/client";

export const BASIC_DETAILS_CATEGORY_FRAGMENT = gql`
    fragment BasicDetalisCategory on CategoriaType {
        name
        image
        id
    }
`