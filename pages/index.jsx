import { HOME_QUERIES } from "@/graphql/HOME-QUERIES";
import { initializeApollo } from "@/lib/apolloClient"; // Importar la función para inicializar el cliente de Apollo
import HomeSection from "@/sections/Home/HomeSection";

const Home = ({ result }) => {

  return (
    <>
      <HomeSection data={result} />
    </>
  );
}

export const getStaticProps = async () => {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: HOME_QUERIES, // Realizar la consulta GraphQL
  });

  const responseSize = JSON.stringify(data).length; // Calcular el tamaño de la respuesta
  console.log(`Tamaño de la respuesta en el servidor: ${responseSize} bytes`); // Imprimir en el servidor

  return {
    props: {
      result: data, // Pasar los datos obtenidos como props
      initialApolloState: apolloClient.cache.extract(), // Pasar el estado inicial de Apollo
    },
  };
}

export default Home