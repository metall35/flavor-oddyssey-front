import { gql } from '@apollo/client';


export const CREATE_USER = gql`
    mutation createUser($username:String!, $password:String!, $email:String!) {
        createUser(username:$username, password:$password, email:$email) {
            token
        }
    }
`

export const LOGIN = gql`
    mutation LOGIN($email:String!, $password:String!) {
        tokenAuth(email:$email, password:$password) {
            token
        }
    }
`