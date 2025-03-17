import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

let apolloClient;

const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql', // URL del servidor GraphQL
})

function createApolloClient() {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined', // Habilitar el modo SSR si se está ejecutando en el servidor
        link: httpLink, // Enlace HTTP para las solicitudes GraphQL
        cache: new InMemoryCache(), // Caché en memoria para Apollo Client
    });
}

export function initializeApollo(initialState = null) {
    const _apolloClient = apolloClient ?? createApolloClient(); // Crear un nuevo cliente de Apollo si no existe

    if (initialState) {
        _apolloClient.cache.restore(initialState); // Restaurar el estado inicial de la caché si existe
    }

    if (typeof window === 'undefined') return _apolloClient; // Devolver el cliente de Apollo si se está ejecutando en el servidor
    if (!apolloClient) apolloClient = _apolloClient; // Asignar el cliente de Apollo si no existe

    return _apolloClient; // Devolver el cliente de Apollo
}

export function useApollo(initialState) {
    const store = useMemo(() => initializeApollo(initialState), [initialState]); // Memorizar el cliente de Apollo
    return store; // Devolver el cliente de Apollo
}
