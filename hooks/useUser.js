import { useQuery } from "@apollo/client";
import { USER_PERFIL_QUERY } from "@/graphql/USER-QUERY";
import { useUserData } from "./useStore";
import { useEffect } from "react";

export const useUser = () => {
    const { data, refetch, error, loading } = useQuery(USER_PERFIL_QUERY);

    const { setUser } = useUserData()

    useEffect(() => {
        if (data) {
            setUser(data.currentUser)
        }
    }, [data])

    return {
        data: data?.currentUser || null,
        error,
        loading,
        refetch
    };
};
