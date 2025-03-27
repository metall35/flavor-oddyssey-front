import { USER_PERFIL_QUERY } from "@/graphql/fragments/USER-QUERY";
import PerfilSection from "@/sections/perfil/PerfilSection";
import { useQuery } from "@apollo/client";

const Perfil = () => {
    const result = useQuery(USER_PERFIL_QUERY);

    if (result.loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <PerfilSection data={result.data} />
        </>
    );
};

// Usa getServerSideProps en lugar de getSideProps
// export const getServerSideProps = async (context) => {
//     const apolloClient = initializeApollo();

//     console.log(context.req.cookies.tokenFlavorOdyssey);


//     try {

//         const result = await apolloClient.query({
//             query: USER_PERFIL_QUERY,
//             ssr: true,
//             context: {
//                 headers: {
//                     Authorization: `jwt ${context.req.cookies.tokenFlavorOdyssey}`,
//                 }
//             }
//         });

//         return {
//             props: {
//                 result,
//                 initialApolloState: apolloClient.cache.extract(),
//             },
//         };
//     } catch (error) {
//         console.error("Error en la consulta:", error);
//         return {
//             props: {
//                 result: null,
//             },
//         };
//     }
// };


export default Perfil;
