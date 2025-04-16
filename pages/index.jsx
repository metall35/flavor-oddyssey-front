import { HOME_QUERIES } from "@/graphql/HOME-QUERIES";
import { initializeApollo } from "@/lib/apolloClient";
import HomeSection from "@/sections/Home/HomeSection";
const Home = ({ result }) => {


  return (
    <>
      <HomeSection data={result} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const apolloClient = initializeApollo(null, ctx);
  const searchHistory = ctx.req.cookies.searchHistoryFlavor
    ? JSON.parse(ctx.req.cookies.searchHistoryFlavor)
    : [];

  const { data } = await apolloClient.query({
    query: HOME_QUERIES,
    variables: {
      search: searchHistory,
    },
  })

  return {
    props: {
      result: data,
      initialApolloState: apolloClient.cache.extract(),
    },
  }
}

export default Home