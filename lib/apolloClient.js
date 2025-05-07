import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';
import Cookies from 'js-cookie';
import { useMemo } from 'react';

let apolloClient;

// Función para crear links - movido a una función para poder recibir el contexto
function createLinks(ctx) {
    const backendUrl = process.env.NEXT_PUBLIC_URLBACKEND; // Obtiene la URL del backend desde el .env
    const cookieTokenName = process.env.COOKIETOKEN; // Obtiene el nombre del token desde el .env

    console.log('Backend URL:', backendUrl); // Log para depuración

    // Enlace normal para consultas y mutaciones
    const httpLink = new HttpLink({
        uri: `${backendUrl}/graphql`,
    });

    console.log('HTTP Link:', httpLink); // Log para depuración
    
    // Enlace especial para subir archivos
    const uploadLink = createUploadLink({
        uri: `${backendUrl}/graphql`,
    });

    // Middleware para agregar el token en los headers
    const authLink = setContext((_, { headers }) => {
        let token = null;

        if (typeof window === 'undefined' && ctx?.req) {
            // 🔹 En SSR: Obtener token desde las cookies del request
            const cookies = ctx.req.headers.cookie || '';
            token = cookies
                .split('; ')
                .find(row => row.startsWith(`${cookieTokenName}=`))
                ?.split('=')[1];

            console.log('SSR - Token encontrado:', !!token); // Log para depuración
        } else {
            // 🔹 En el cliente: Obtener token desde `js-cookie`
            token = Cookies.get(cookieTokenName);
            console.log('Cliente - Token encontrado:', !!token); // Log para depuración
        }

        return {
            headers: {
                ...headers,
                authorization: token ? `JWT ${token}` : '',
            },
        };
    });

    // 🔹 Determina si se usa `uploadLink` o `httpLink`
    return ApolloLink.split(
        ({ variables }) => Object.values(variables).some(value => value instanceof File || value instanceof Blob),
        authLink.concat(uploadLink), // Si hay archivos, usa `uploadLink`
        authLink.concat(httpLink)    // Si no, usa `httpLink` normal
    );
}

// Función para crear una nueva instancia de Apollo Client
function createApolloClient(context = null) {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Habilita SSR en el servidor
        link: createLinks(context),
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: "cache-and-network", // Siempre intenta obtener datos frescos
            },
        },
    });
}

// 🔹 Inicializa Apollo (se usa en `getServerSideProps`)
export function initializeApollo(initialState = null, context = null) {
    const _apolloClient = apolloClient ?? createApolloClient(context);

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

// 🔹 Hook para utilizar Apollo en el cliente
export function useApollo(initialState) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}