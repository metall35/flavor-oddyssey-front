import { gql } from "@apollo/client"
import { BASIC_DETAILS_RECIPE_FRAGMENT } from "../fragments/BASIC-FRAGMENTS"


export const LIKE_MUTATION = gql`
    mutation Like($id:UUID!) {
        createLike(receta: $id) {
            like {
                id
                receta {
                    ...BasicDetailsRecipe
                    autor {
                        username
                    }
                }
            }
        }
    }

    ${BASIC_DETAILS_RECIPE_FRAGMENT}
`