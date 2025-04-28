import Loader from "@/components/AuxComponents/Loader";
import { SEARCH_QUERY } from "@/graphql/SEARCH-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import dynamic from "next/dynamic";

const AllRecipesView = dynamic(() => import('@/sections/AllRecipes/AllRecipesView'), {
    ssr: false,
    loading: () => <Loader />
});

const SearchPage = ({ result }) => {

    if (result.search.length == 0) {
        return (
            <div className="w-full h-[calc(100vh-280px)] flex justify-center py-5">
                <p className=""> No se encontraron resultados. </p>
            </div>
        )
    }


    return (
        <>
            <AllRecipesView data={result.search} title={`Resultados (${result.search.length})`} />
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

    console.log(data);
    

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