import { gql } from "@apollo/client";

export const CREATE_RECIPE_MUTATION = gql`
    mutation createReceta(
        $category: UUID!,
        $description: String!,
        $difficulty: String!,
        $image: Upload!,
        $ingredientes:[IngredienteInput]!,
        $name: String!,
        $pasos:[String]!,
        $time:Int!
        ){
            createReceta(
                category:$category,
                description: $description,
                difficulty: $difficulty,
                image: $image,
                ingredientes: $ingredientes,
                name: $name,
                pasos: $pasos,
                time:	$time
            ) {
                success
                message
            }
        }
`