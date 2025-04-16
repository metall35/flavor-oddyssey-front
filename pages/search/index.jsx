import { SEARCH_QUERY } from "@/graphql/SEARCH-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import AllRecipesView from "@/sections/AllRecipes/AllRecipesView";



const SearchPage = ({ query, filters, result }) => {

    if (!result.search) {
        return (
            <>
                <p> No se encontraron resultados. </p>
            </>
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