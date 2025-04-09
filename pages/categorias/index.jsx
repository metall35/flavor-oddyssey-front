import { CATEGORY_AND_FOOD_QUERY } from "@/graphql/CATEGORY-AND-FOOD-QUERY";
import { initializeApollo } from "@/lib/apolloClient";
import CategoryView from "@/sections/Category/CategoryView";

const categoryPage = ({ data }) => {
    console.log("Category Page Data:", data);
    
    return (
        <>
            <CategoryView data={data} />
        </>
    );
}

export default categoryPage

export const getServerSideProps = async (context) => {
    const client = initializeApollo(null, context)

    try {
        const { data } = await client.query({
            query: CATEGORY_AND_FOOD_QUERY,
        })

        return {
            props: {
                data: data || [],
                initialApolloState: client.cache.extract(),
            },
        }
    } catch (error) {
        console.error("❌ Apollo Client Error:", error.message)

        return {
            notFound: true, // O devolver una página de error
        }

    }
}

