import { HOME_QUERIES } from "@/graphql/HOME-QUERIES";
import { LIKE_MUTATION } from "@/graphql/mutations/LIKE-MUTATION";
import useRedirect from "@/hooks/useRedirect";
import { useUser } from "@/hooks/useUser";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GoHeart, GoHeartFill } from "react-icons/go";

const LikeComponent = ({ likes, calificaciones, id, size }) => {
    const { data } = useUser();
    const [isLiked, setIsLiked] = useState(false)
    const [currentLikes, setCurrentLikes] = useState(likes)
    const router = useRouter()
    const { getRedirectPath } = useRedirect()

    const [like] = useMutation(LIKE_MUTATION, {
        onError: (err) => {
            toast.error("Ha ocurrido un error, intenta de nuevo")
            setIsLiked(prev => !prev)
        },
        update: (store, { data: mutationData }) => {
            const newLike = mutationData?.createLike?.like

            if (!newLike) {
                // Like eliminado
                setIsLiked(false);
                toast.error("Se ha eliminado el like")
                setCurrentLikes(prev => prev - 1)

                return
            }

            // Actualizar caché
            try {
                const dataInCache = store.readQuery({ query: HOME_QUERIES })
                if (dataInCache) {
                    store.writeQuery({
                        query: HOME_QUERIES,
                        data: {
                            ...dataInCache,
                            recetas: dataInCache.recetas.map(receta =>
                                receta.id === id
                                    ? { ...receta, calificaciones: [...receta.calificaciones, newLike] }
                                    : receta
                            )
                        }
                    })
                }

            } catch (error) {
                console.error("Error updating cache:", error)
            }
            setCurrentLikes(prev => prev + 1)
            toast.success("Receta guardada en favoritos")
        },
    });

    // Efecto para sincronizar isLiked con los datos del usuario
    useEffect(() => {
        if (data?.calificaciones) {
            const liked = data.calificaciones.some(calificacion =>
                calificaciones.some(c => c.id === calificacion.id)
            );
            setIsLiked(liked);
        }
    }, [data, calificaciones]);

    const handleLike = async () => {
        if (!data) {
            router.push(getRedirectPath("/"));
            return;
        }

        // Actualización optimista inmediata
        setIsLiked(prev => !prev);

        try {
            await like({ variables: { id } });
        } catch (error) {
            // El onError de la mutación ya maneja el revertir el estado
            console.error("Like error:", error);
        }
    };

    if (data == null) {
        return (
            <span className="flex items-center gap-1" onClick={handleLike}>
                <GoHeart size={size} className="fill-black hover:fill-flavor-2" /> {currentLikes}
            </span>
        );
    }

    return (
        <span className="flex items-center gap-1" onClick={handleLike}>
            {isLiked
                ? <><GoHeartFill size={size} className="fill-flavor-2 hover:fill-black" /> {currentLikes}</>
                : <><GoHeart size={size} className="fill-black hover:fill-flavor-2" /> {currentLikes}</>
            }
        </span>
    );
};

export default LikeComponent;