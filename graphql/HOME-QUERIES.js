import { gql } from '@apollo/client';
import { BASIC_DETAILS_RECIPE_FRAGMENT } from './fragments/RECIPE-QUERY';
import { BASIC_DETAILS_CATEGORY_FRAGMENT } from './fragments/CATEGORY-QUERY';

export const HOME_QUERIES = gql`
    query {
        recetas {
            ...BasicDetalisRecipe
            autor {
                username
            }
        }
        categorias {
            ...BasicDetalisCategory
        }
    }

    ${BASIC_DETAILS_RECIPE_FRAGMENT}
    ${BASIC_DETAILS_CATEGORY_FRAGMENT}
`