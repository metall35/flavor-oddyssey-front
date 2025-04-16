import { gql } from "@apollo/client";
import { BASIC_DETAILS_RECIPE_FRAGMENT } from "./fragments/BASIC-FRAGMENTS";


export const SEARCH_QUERY = gql`
    query search($consulta:String, $category:String, $time:Int, $ingredient: [String], $difficulty:String) {
        search(consulta: $consulta, category:$category, time:$time, ingredients:$ingredient, difficulty:$difficulty) {
            ...BasicDetailsRecipe
        }
    }

    ${BASIC_DETAILS_RECIPE_FRAGMENT}
`