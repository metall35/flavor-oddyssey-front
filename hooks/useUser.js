import { useQuery } from "@apollo/client";
import { USER_PERFIL_QUERY } from "@/graphql/USER-QUERY";

export const useUser = () => {
    const { data, refetch, error, loading } = useQuery(USER_PERFIL_QUERY);

    return {
        data: data?.currentUser || null,
        error,
        loading,
        refetch
    };
};
