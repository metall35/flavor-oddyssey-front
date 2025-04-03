import { TitleH2 } from "@/components/AuxComponents/Title"
import Container from "@/components/Sections/Container"
import { formatRelativeTime } from "@/lib/utils"
import Image from "next/image"

const RecipeComents = ({ data }) => {
    return (
        <div className="w-full md:pl-26 md:pr-10 px-4">
            <TitleH2 text="Comentarios" />
            <div>
                agregar comentario
            </div>
            <ul className="w-full">
                {data.length == 0 ? <p>No hay comentarios para mostrar</p> : (
                    <>
                        {data?.map(coment => (
                            <li className="py-2 px-4 w-full shadow-md flex rounded-2xl gap-4 items-center bg-white/30">
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
                                    <h3 className="flex items-center justify-between" >{coment.usuario.username} <span className="text-xs italic text-black/30">{formatRelativeTime(coment.fecha)}</span></h3>
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

export default RecipeComents