import { gql } from "@apollo/client";

export const UPDATE_RECIPE_MUTATION = gql`
    mutation updateRecipe ($category:UUID, $description:String, $difficulty: String, $id:UUID!, $image: Upload, $ingredientes: [IngredienteInput], $name: String, $pasosLista:[String], $time: Int) {
        updateReceta(category: $category, description: $description, difficulty: $difficulty, image: $image, ingredientes: $ingredientes, name: $name, pasosLista: $pasosLista, time: $time, id:$id) {
            success
        }
    }
`