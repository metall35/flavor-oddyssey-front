import { SINGLE_RECIPE_QUERY } from "@/graphql/SINGLE-RECIPE-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import RecipeView from "@/sections/Recipe/RecipeView";

const RecipePage = ({ id, result }) => {

    if (!result) {
        return (
            <p>cargando....</p>
        )
    }

    return (
        <>
            <RecipeView data={result} />
        </>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.query;
    const client = initializeApollo(null, context);

    try {
        const { data } = await client.query({
            query: SINGLE_RECIPE_QUERY,
            variables: { id: `${id}` }, // Forzar string
        });

        return {
            props: {
                result: data?.getReceta || null,
                id,
            },
        };
    } catch (error) {
        console.error("❌ Apollo Client Error:", error.message);

        return {
            notFound: true, // O devolver una página de error
        };
    }
}


export default RecipePage;
