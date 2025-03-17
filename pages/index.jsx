import { HOME_QUERIES } from "@/graphql/HOME-QUERIES";
import { initializeApollo } from "@/lib/apolloClient"; // Importar la función para inicializar el cliente de Apollo
import HomeSection from "@/sections/Home/HomeSection";

const Home =() => {
  // console.log(result); // Imprimir los resultados de la consulta en la consola

  return (
    <>
      <HomeSection />
    </>
  );
}

// export const getStaticProps = async () => {
//   const apolloClient = initializeApollo(); // Inicializar el cliente de Apollo
//   const { data } = await apolloClient.query({
//     query: HOME_QUERIES, // Realizar la consulta GraphQL
//   });

//   return {
//     props: {
//       result: data, // Pasar los datos obtenidos como props
//       initialApolloState: apolloClient.cache.extract(), // Pasar el estado inicial de Apollo
//     },
//   };
// }

export default Home