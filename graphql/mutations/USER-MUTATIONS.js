import { gql } from "@apollo/client";
import { CURRENTUSER_FRAGMENT } from "../fragments/COMPOUND-FRAGMENTS";



export const UPDATE_USER_MUTATION = gql`
    mutation updateUser($email: String, $id: UUID!, $password:String, $photo: Upload, $username: String) {
        updateUser (email:$email, id:$id, username: $username, password:$password, photo:$photo){
            user {
                ...UserProfile
            }
            message
            success
        }
    }

    ${CURRENTUSER_FRAGMENT}

`