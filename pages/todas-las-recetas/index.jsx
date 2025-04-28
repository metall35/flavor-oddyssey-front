import Loader from "@/components/AuxComponents/Loader";
import { ALL_RECIPES_QUERY } from "@/graphql/ALL-RECIPES-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import dynamic from "next/dynamic";

const AllRecipesView = dynamic(() => import('@/sections/AllRecipes/AllRecipesView'), {
    ssr: false,
    loading: () => <Loader />
});

const AllRecipesPage = ({ result }) => {
    return (
        <>
            <AllRecipesView data={result.recetas} title="Todas las recetas" />
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