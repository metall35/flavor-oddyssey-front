import { SINGLE_RECIPE_QUERY } from "@/graphql/SINGLE-RECIPE-QUERY";
import { initializeApollo, useApollo } from "@/lib/apolloClient";
import RecipeView from "@/sections/Recipe/RecipeView";

const RecipePage = ({ id, result, initialApolloState }) => {
    const apolloClient = useApollo(initialApolloState);


    return (
        <>
            <RecipeView data={result} apolloClient={apolloClient}  />
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
                initialApolloState: client.cache.extract(),
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
