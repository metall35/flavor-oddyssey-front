import { PiChefHat, PiBowlFood } from "react-icons/pi";
import ShortCard from "./ShortCard";
import Link from "next/link";
import RecipeScrollVertical from "./RecipeScroll/RecipeScrollVertical";
import Container from "@/components/Sections/Container";
import { TitleH2 } from "@/components/AuxComponents/Title";
import GeneralButton from "@/components/Buttons/GeneralButton";

const SectionCard = ({ data }) => {
    const card = [
        {
            link: "/categorias",
            title: "Todas las categorias",
            icon: <PiChefHat size={100} className="fill-flavor-2" />
        },
        // {
        //     link: "/categorias",
        //     title: "Planea tu semana",
        //     icon: "Planea tu semana",
        // },
        {
            link: "/categorias",
            title: "Alimentos disponibles",
            icon: <PiBowlFood size={100} className="fill-flavor-2" />
        }
    ]


    return (
        <Container className="flex flex-col justify-center items-center gap-20 bg-white/30 py-10">
            <div className="flex gap-10">
                {card.map(card => (
                    <Link href={card.link}>
                        <ShortCard title={card.title} icon={card.icon} />
                    </Link>
                ))}
            </div>

            <div className="w-full flex flex-col items-center">
                <TitleH2 text="Pública tus recetas" classes="text-center" />
                <p className="max-w-200 text-balance text-center text-md mt-2">
                    ¡Publica tus propias recetas y comparte tu creatividad con nuestra comunidad!
                    Inspira a otros y encuentra nuevas delicias culinarias mientras creas y
                    contribuyes con tus platillos favoritos.
                </p>
                <GeneralButton text="Empieza" classes="bg-flavor-2 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300 mt-10" />
            </div>

            <RecipeScrollVertical data={data} />
        </Container>
    )
}

export default SectionCard