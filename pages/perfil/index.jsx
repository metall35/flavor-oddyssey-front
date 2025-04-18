import { useUser } from "@/hooks/useUser";
import PerfilSection from "@/sections/perfil/PerfilSection";

const Perfil = () => {
    const { data, loading } = useUser();

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <>
            <PerfilSection data={data} />
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
