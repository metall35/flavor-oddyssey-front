import "@/styles/globals.css";
import { DefaultSeo } from 'next-seo';
import Layout from '@/components/Layout/Layout';
import SEO from '@/next-seo.config';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient'; // Importar el hook personalizado

const RootLayout = ({ Component, pageProps }) => {
    const client = useApollo(pageProps.initialApolloState); // Usar el hook personalizado para obtener el cliente de Apollo

    return (
        <ApolloProvider client={client}> {/* Proveer el cliente de Apollo a toda la aplicación */}
            <Layout> {/* Componente de diseño global */}
                <DefaultSeo {...SEO} /> {/* Configuración SEO por defecto */}
                <Component {...pageProps} /> {/* Renderizar el componente de la página actual */}
            </Layout>
        </ApolloProvider>
    )
}

export default RootLayout