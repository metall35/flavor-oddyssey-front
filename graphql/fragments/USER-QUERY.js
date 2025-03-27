import { gql } from "@apollo/client"
import { BASIC_DETAILS_RECIPE_FRAGMENT } from "./RECIPE-QUERY"


export const USER_BASIC_DATA_FRAGMENT = gql`
    fragment UserBasicData on UserType {
        id
        username
        photo
        email
    }
`

export const CURRENTUSER_FRAGMENT = gql`
    fragment UserProfile on UserType  {
        ...UserBasicData
        recetas {
            ...BasicDetalisRecipe
        }
        calificaciones {
            id
            receta {
                ...BasicDetalisRecipe
            }
        }
    }

    ${BASIC_DETAILS_RECIPE_FRAGMENT}
    ${USER_BASIC_DATA_FRAGMENT}
`

export const USER_PERFIL_QUERY = gql`
    query {
        currentUser {
            ...UserProfile
        }
    }

    ${CURRENTUSER_FRAGMENT}
`