import { gql } from "@apollo/client";


export const USER_BASIC_DATA_FRAGMENT = gql`
    fragment UserBasicData on UserType {
        id
        username
        photo
        email
    }
`


export const BASIC_DETAILS_CATEGORY_FRAGMENT = gql`
    fragment BasicDetailsCategory on CategoriaType {
        name
        image
        id
    }
`

export const BASIC_DETAILS_RECIPE_FRAGMENT = gql`
    fragment BasicDetailsRecipe on RecetaType {
        image
        name
        id
        time
        difficulty
    }
`