import { gql } from "@apollo/client"
import { CURRENTUSER_FRAGMENT } from "./fragments/COMPOUND-FRAGMENTS"

export const USER_PERFIL_QUERY = gql`
    query {
        currentUser {
            ...UserProfile
        }
    }

    ${CURRENTUSER_FRAGMENT}
`