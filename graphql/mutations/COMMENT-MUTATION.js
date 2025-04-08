import { gql } from '@apollo/client';
import { ALL_DETAILS_RECIPE_FRAGMENT } from '../fragments/COMPOUND-FRAGMENTS';
import { USER_BASIC_DATA_FRAGMENT } from '../fragments/BASIC-FRAGMENTS';


export const COMMENT_MUTATION = gql`
    mutation Comment($id: UUID!, $puntuacion: Int!, $texto: String!) {
        createComentario(receta: $id, puntuacion: $puntuacion, texto: $texto) {
            comentario {
                id
                texto
                puntuacion
                fecha
                usuario {
                    ...UserBasicData
                }
                receta {
                    id
                    comentarios {
                        id
                    }
                    ...AllDetailsRecipe
                }
            }
        }
    }
    ${USER_BASIC_DATA_FRAGMENT}
    ${ALL_DETAILS_RECIPE_FRAGMENT}
`