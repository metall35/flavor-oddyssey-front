import { TitleH2 } from "@/components/AuxComponents/Title"
import { ItemInfo } from "@/components/Cards/WideCard";
import CustomSelect from "@/components/FormInputs/Select";
import Container from "@/components/Sections/Container"
import Image from "next/image"
import { useMemo, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { SiStagetimer } from "react-icons/si";


const ContainerItemsInfo = ({ time, difficulty, category }) => {
    return (
        <div className="w-full flex gap-8 text-black my-2">
            <ItemInfo text={time} icon={<CiTimer size={18} />} className="px-4" />
            <ItemInfo
                className="p-2"
                text={difficulty}
                icon={
                    <SiStagetimer
                        size={16}
                        className={`
                            ${difficulty == "Fácil"
                                ? "fill-flavor-1"
                                : difficulty == "Intermedio"
                                    ? "fill-amber-400"
                                    : "fill-red-500"
                            }
                        `}
                    />
                }
            />
            <ItemInfo text={category} icon={<></>} className="md:px-4 px-2 text-center" />
        </div>
    );
};

const IngredientsSection = ({ data }) => {
    const [portion, setPortion] = useState(1);
    
    // Generamos las opciones una sola vez al montar el componente
    const options = useMemo(() => {
        const opts = [];
        for (let i = 1; i <= 10; i++) {
            opts.push({ value: i, label: i.toString() }); // Corregí el label para que muestre el número correcto
        }
        return opts;
    }, []);

    return (
        <div className="mt-4">
            <div className="flex gap-2 items-center">
                <h2 className="font-bold">Ingredientes para {portion} {portion == 1 ? "porción" : "porciones"}</h2>
                <CustomSelect
                    label=""
                    name="porciones"
                    onChange={setPortion}
                    value={portion}
                    options={options}
                />
            </div>
            <h3 className="text-lg mt-1 font-medium">Ingredientes</h3>
            {data?.ingredientes?.length === 0 ? (
                <p>No hay alimentos para mostrar.</p>
            ) : (
                <ul className="list-disc text-sm px-6 grid grid-cols-2 w-full font-light">
                    {data?.ingredientes?.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.ingrediente.name} <span>{ingredient.cantidad * portion} {ingredient.medida}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};


const RecipeSection = ({ data }) => {

    return (
        <Container className="flex md:flex-row flex-col gap-8">
            <Image
                src={data.image}
                alt={data.name}
                width={1920}
                height={1080}
                placeholder="blur"
                quality={90}
                blurDataURL="/image/recipe.png"
                className="rounded-lg md:w-8/12 w-full aspect-video object-cover"
            />
            <div className="md:w-3/12 w-full">
                <TitleH2 text={data.name} />
                <p className="text-xs mt-1 italic">Receta creada por: <span className="font-semibold">{data.autor.username}</span></p>
                <p className="text-sm my-2">{data.description}</p>
                <ContainerItemsInfo time={`${data.time}'`} difficulty={data.difficulty} category={data.category.name} />
                <IngredientsSection data={data} />
                <div className="mt-2">
                    <h3 className="text-lg ">Pasos a seguir</h3>
                    {data?.pasosLista === null ? <p className="text-sm">No hay pasos para mostrar.</p> : (
                        <>
                            <ol className="list-decimal text-sm px-6 mb-2">
                                {data.pasosLista.map((paso, i) => (
                                    <li key={i}>{paso}</li>
                                ))}
                            </ol>
                        </>
                    )}

                </div>
                <div className="bg-gradient-to-r from-transparent from-0% via-black/50 via-50% to-transparent to-100% mt-4 w-full h-0.5"></div>
            </div>
        </Container>

    )

}

export default RecipeSection