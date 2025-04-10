import { ALL_RECIPES_QUERY } from "@/graphql/ALL-RECIPES-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import AllRecipesView from "@/sections/AllRecipes/AllRecipesView";

const AllRecipesPage = ({ result }) => {
    return (
        <>
            <AllRecipesView data={result.recetas} />
        </>
    );
}


export async function getServerSideProps(ctx) {
    const apolloClient = initializeApollo(null, ctx)
    const { data } = await apolloClient.query({
        query: ALL_RECIPES_QUERY,
    })

    return {
        props: {
            result: data,
            initialApolloState: apolloClient.cache.extract(),
        },
    }
}

export default AllRecipesPage;