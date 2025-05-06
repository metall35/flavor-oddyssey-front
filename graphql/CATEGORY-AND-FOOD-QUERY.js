import { gql } from "@apollo/client";
import { BASIC_DETAILS_CATEGORY_FRAGMENT } from "./fragments/BASIC-FRAGMENTS";


export const CATEGORY_AND_FOOD_QUERY = gql`
    query categoryAndFoodQuery {
        categorias {
            ...BasicDetailsCategory
        }
        ingredientes {
            id
            name
        }
    }

    ${BASIC_DETAILS_CATEGORY_FRAGMENT}
`