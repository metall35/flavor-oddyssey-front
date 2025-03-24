import { gql } from "@apollo/client"


export const USER_BASIC_DATA_FRAGMENT = gql`
    fragment UserBasicData on UserType {
        id
        username
        photo

    }
`

export const CURRENTUSER_QUERY = gql`
    query currentUser {
        currentUser {
            ...UserBasicData
        }
    }


${USER_BASIC_DATA_FRAGMENT}
`
