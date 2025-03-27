import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

import Cookies from 'js-cookie';

let apolloClient;

// Enlace para consultas y mutaciones normales
const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql', // URL del servidor GraphQL
});

// Enlace para subir archivos (solo se usa en mutaciones con archivos)
const uploadLink = createUploadLink({
    uri: 'http://localhost:8000/graphql',
});

// Middleware para agregar el token de autenticación
const authLink = setContext((_, { headers, context }) => {
    let token;

    if (typeof window === 'undefined' && context?.req) {
        // Estamos en SSR: Obtener token desde cookies del servidor
        const parsedCookies = context.req.headers.cookie
            ?.split('; ')
            .find(row => row.startsWith('tokenFlavorOdyssey='))
            ?.split('=')[1];

        token = parsedCookies;
    } else {
        // Estamos en el cliente: Obtener token desde js-cookie
        token = Cookies.get('tokenFlavorOdyssey');
    }

    return {
        headers: {
            ...headers,
            authorization: token ? `JWT ${token}` : null, 
        },
    };
});

// Filtrar qué enlace usar dependiendo de si la operación tiene archivos
const link = ApolloLink.split(
    ({ variables }) => Object.values(variables).some(value => value instanceof File || value instanceof Blob), 
    authLink.concat(uploadLink), // Si hay archivos, usa `uploadLink`
    authLink.concat(httpLink)    // Si no, usa `httpLink` normal
);

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Habilitar el modo SSR si se está ejecutando en el servidor
        link, // Usar el link combinado
        cache: new InMemoryCache(), // Caché en memoria
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient();

    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }

    if (typeof window === 'undefined') return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState) {
    return useMemo(() => initializeApollo(initialState), [initialState]);
}
