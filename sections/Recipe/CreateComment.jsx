import ButtonSubmit from "@/components/Buttons/ButtonSubmit"
import GeneralButton from "@/components/Buttons/GeneralButton"
import { COMMENT_MUTATION } from "@/graphql/mutations/COMMENT-MUTATION"
import { SINGLE_RECIPE_QUERY } from "@/graphql/SINGLE-RECIPE-QUERY"
import useRedirect from "@/hooks/useRedirect"
import { useUser } from "@/hooks/useUser"
import { useApolloClient, useMutation } from "@apollo/client"
import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import toast from "react-hot-toast"
import { IoIosStarOutline, IoIosStar } from "react-icons/io";


const CreateComment = () => {
    const { data } = useUser()
    const [ButtonCommentView, setButtonCommentView] = useState(false)
    const [commentText, setCommentText] = useState("")
    const [rating, setRating] = useState(0)
    const router = useRouter()
    const { getRedirectPath } = useRedirect()
    const apolloClient = useApolloClient();

    const [comment, { loading }] = useMutation(COMMENT_MUTATION, {
        onError: (e) => {
            toast.error("Error al publicar el comentario");
            console.error("Error al crear el comentario", e);
        },
        update: (cache, { data: mutationData }) => {
            const newComment = mutationData?.createComentario?.comentario;
            if (!newComment) return;

            try {
                // Leer la caché actual
                const existingData = cache.readQuery({
                    query: SINGLE_RECIPE_QUERY,
                    variables: { id: router.query.id },
                });

                if (!existingData?.getReceta) return;

                // Escribir los nuevos datos en la caché
                cache.writeQuery({
                    query: SINGLE_RECIPE_QUERY,
                    variables: { id: router.query.id },
                    data: {
                        getReceta: {
                            ...existingData.getReceta,
                            recipe: newComment.receta,
                        },
                    },
                });
            } catch (error) {
                console.error("Error updating cache:", error);
            }
        },
        onCompleted: () => {
            toast.success("Comentario publicado con éxito");
            setButtonCommentView(false);
            setCommentText("");
            setRating(0);
            // Opcional: Refetch para asegurar consistencia
            apolloClient.query({
                query: SINGLE_RECIPE_QUERY,
                variables: { id: router.query.id },
                fetchPolicy: "network-only",
            });
        },
    });

    const handleComment = async (e) => {
        e.preventDefault()
        if (!data) {
            toast.error("Debes iniciar sesión para comentar.")
            router.push(getRedirectPath(router.asPath))
            return
        }
        if (commentText.length < 3) return toast.error("El comentario es muy corto.")
        if (rating < 1) return toast.error("Debes seleccionar una puntuación.")
        await comment({
            variables: {
                id: router.query.id,
                puntuacion: rating,
                texto: commentText
            }
        })
    }

    const handleRating = (value) => {
        setRating(value) // Actualiza la puntuación seleccionada
    }

    return (
        <form className="my-4 bg-white/30 shadow-md rounded-2xl" onSubmit={handleComment}>
            <div className="w-full flex gap-4 items-center py-2 px-4" onClick={() => setButtonCommentView(true)}>
                <Image
                    src={data ? data.photo : "/image/recipe.png"}
                    alt={data ? data.username : "Usuario"}
                    width={48}
                    height={48}
                    placeholder="blur"
                    blurDataURL="/image/recipe.png"
                    className="rounded-full w-10 h-10 aspect-square object-cover "
                />
                <div className="w-full">
                    <div className="flex items-center gap-1 mb-2">
                        <h3>Elige la puntuación: </h3>
                        <div className="flex">
                            {Array.from({ length: 5 }, (_, index) => (
                                <span key={index} onClick={() => handleRating(index + 1)}>
                                    {index < rating ? (
                                        <IoIosStar size={20} className="fill-flavor-2 cursor-pointer" />
                                    ) : (
                                        <IoIosStarOutline size={20} className="cursor-pointer" />
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                    <textarea name="comment" id="comment"
                        className="w-full border-b-2 border-black/20 bg-transparent focus:outline-none focus:border-flavor-3 transition-all duration-200 resize-none field-sizing-content"
                        rows={1}
                        placeholder="Escribe un comentario..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                </div>
            </div>
            {ButtonCommentView &&
                <div className="w-full flex gap-4 items-center justify-end py-2 px-4 rounded-2xl">
                    <GeneralButton text="Cancelar" onClick={() => setButtonCommentView(false)} classes="bg-gray-400 shadow-gray-400/50 hover:shadow-gray-500/50 hover:bg-gray-500 hover:scale-105 transition-transform duration-300" />
                    <ButtonSubmit text="Comentar" loading={loading} disabled={loading} />
                </div>
            }
        </form>
    )
}

export default CreateComment