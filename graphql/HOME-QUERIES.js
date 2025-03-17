import { gql } from '@apollo/client';
import { DETAILS_RECIPE_FRAGMENT } from './fragments/RECIPE-QUERY';

export const HOME_QUERIES = gql`
    query {
        recetasAll {
            ...DetailsRecipe
        }
    }

    ${DETAILS_RECIPE_FRAGMENT}
`