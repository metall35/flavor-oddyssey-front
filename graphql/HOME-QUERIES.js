import { gql } from '@apollo/client'
import { BASIC_DETAILS_CATEGORY_FRAGMENT, BASIC_DETAILS_RECIPE_FRAGMENT } from './fragments/BASIC-FRAGMENTS'

export const HOME_QUERIES = gql`
    query HomeQuery($search: [String]) {
        recetas (searchs: $search) {
            ...BasicDetailsRecipe
        }
        categorias {
            ...BasicDetailsCategory
        }
        recetasLast {
            ...BasicDetailsRecipe
            autor {
                username
            }
        }
    }

    ${BASIC_DETAILS_RECIPE_FRAGMENT}
    ${BASIC_DETAILS_CATEGORY_FRAGMENT}
`