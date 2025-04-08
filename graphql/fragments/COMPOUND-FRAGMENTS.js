import { gql } from "@apollo/client";
import { BASIC_DETAILS_CATEGORY_FRAGMENT, BASIC_DETAILS_RECIPE_FRAGMENT, USER_BASIC_DATA_FRAGMENT } from "./BASIC-FRAGMENTS";

export const ALL_DETAILS_RECIPE_FRAGMENT = gql`
    fragment AllDetailsRecipe on RecetaType {
        ...BasicDetailsRecipe
        description
        category {
            ...BasicDetailsCategory
        }
        autor {
            ...UserBasicData
        }
        pasosLista
        fechaCreacion
        ingredientes {
            id
            cantidad
            medida
            ingrediente {
                id
                name
            }
        }
        comentarios {
            id
            texto
            puntuacion
            fecha
            usuario {
                ...UserBasicData
            }
        }
    }

    ${BASIC_DETAILS_CATEGORY_FRAGMENT}
    ${BASIC_DETAILS_RECIPE_FRAGMENT}
    ${USER_BASIC_DATA_FRAGMENT}
    

`


export const CURRENTUSER_FRAGMENT = gql`
    fragment UserProfile on UserType  {
        ...UserBasicData
        recetas {
            ...BasicDetailsRecipe
        }
        calificaciones {
            id
            receta {
                ...BasicDetailsRecipe
            }
        }
    }

    ${USER_BASIC_DATA_FRAGMENT}
    ${BASIC_DETAILS_RECIPE_FRAGMENT}
`