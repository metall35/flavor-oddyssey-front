import Loader from "@/components/AuxComponents/Loader";
import { SEARCH_QUERY } from "@/graphql/SEARCH-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import dynamic from "next/dynamic";

const AllRecipesView = dynamic(() => import('@/sections/Search/SearchView'), {
    ssr: false,
    loading: () => <Loader />
});

const SearchPage = ({ result }) => {

    return (
        <>
            <AllRecipesView result={result} />
        </>
    )
}

export async function getServerSideProps(ctx) {
    const { q, filters } = ctx.query;
    const apolloClient = initializeApollo(null, ctx)

    const newFilters = JSON.parse(filters)

    const { data } = await apolloClient.query({
        query: SEARCH_QUERY,
        variables: {
            consulta: q ? q : "",
            category: newFilters.categoryValue,
            time: newFilters.time == "" ? 0 : newFilters.time,
            difficulty: newFilters.difficulty,
            ingredient: newFilters.ingredients
        }
    })


    return {
        props: {
            query: q || "",
            filters: filters || {},
            result: data,
            initialApolloState: apolloClient.cache.extract(),
        },
    };
}


export default SearchPage