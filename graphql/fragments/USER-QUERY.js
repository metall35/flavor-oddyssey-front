import { gql } from "@apollo/client"
import { BASIC_DETAILS_RECIPE_FRAGMENT } from "./RECIPE-QUERY"



export const USER_PERFIL_QUERY = gql`
    query {
        currentUser {
            ...UserProfile
        }
    }

    ${CURRENTUSER_FRAGMENT}
`