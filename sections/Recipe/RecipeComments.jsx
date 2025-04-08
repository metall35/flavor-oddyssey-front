import { TitleH2 } from "@/components/AuxComponents/Title";
import CreateComment from "./CreateComment";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";
import { useQuery } from "@apollo/client";
import { SINGLE_RECIPE_QUERY } from "@/graphql/SINGLE-RECIPE-QUERY";
import Image from "next/image";
import { formatRelativeTime } from "@/lib/utils";

const RecipeComments = ({ initialData, id }) => {

    const { data } = useQuery(SINGLE_RECIPE_QUERY, {
        variables: { id },
        fetchPolicy: "cache-first", // Usa la caché primero
    });

    // Combina datos iniciales del SSR con posibles actualizaciones del cliente
    const comments = data?.getReceta?.recipe?.comentarios || initialData?.recipe?.comentarios || [];

    return (
        <div className="w-full md:max-w-8/12 lg:pl-26 lg:pr-10 md:pl-10 px-4 mb-10">
            <TitleH2 text="Comentarios" />
            <CreateComment  />
            <ul className="w-full">
                {comments.length == 0 ? <p>No hay comentarios para mostrar</p> : (
                    <>
                        {comments?.map(coment => (
                            <li className="py-2 px-4 w-full shadow-md flex rounded-2xl gap-4 items-center bg-white/30" key={coment.id}>
                                <Image
                                    src={coment.usuario.photo}
                                    alt={coment.usuario.username}
                                    width={48}
                                    height={48}
                                    placeholder="blur"
                                    blurDataURL="/image/recipe.png"
                                    className="rounded-full w-10 h-10 aspect-square object-cover "
                                />
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 mb-2">
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <span key={index}>
                                                    {index < coment.puntuacion ? (
                                                        <IoIosStar size={16} className="fill-flavor-2" />
                                                    ) : (
                                                        <IoIosStarOutline size={16} />
                                                    )}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="text-xs italic text-black/30">{formatRelativeTime(coment.fecha)}</span>
                                    </div>
                                    <h3 className="text-base" >{coment.usuario.username}</h3>
                                    <p className="text-xs mt-1">{coment.texto}</p>
                                </div>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    )
}

export default RecipeComments