import { gql } from '@apollo/client';


export const DELETE_RECIPE = gql`
    mutation deleteRecipe ($id: UUID!){
        deleteReceta(id:$id) {
            success
        }
    }
`