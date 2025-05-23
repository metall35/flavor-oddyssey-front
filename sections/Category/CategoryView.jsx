import { TitleH2 } from "@/components/AuxComponents/Title"
import Container from "@/components/Sections/Container"
import ContentCategory from "@/components/Sections/ContentCategory"
import { useRouter } from "next/router"

const CategoryView = ({ data }) => {
    const router = useRouter()

    const handleClick = (id) => {
        router.push({
            pathname: "/search",
            query: { q: "", filters: JSON.stringify({ categoryValue: "", time: '', difficulty: '', ingredients: [id] }) }
        })
    }

    return (
        <Container className="flex flex-col items-center justify-center gap-8 w-full mb-10">
            <TitleH2 text="Todas nuestras categorias" />
            <ContentCategory data={data.categorias} style="max-w-20" className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8" />
            <TitleH2 text="Nuestros alimentos" />
            <ul className="list-none text-md px-6 grid md:grid-cols-3 grid-cols-2 w-full justify-items-center gap-4">
                {data?.ingredientes?.map((ingredient) => (
                    <li key={ingredient.id} className="w-full flex flex-col items-center justify-center gap-2 bg-white/30 shadow-md rounded-2xl p-4 cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => handleClick(ingredient.id)}>
                        {ingredient.name}
                    </li>
                ))}
            </ul>
        </Container>
    )
}

export default CategoryView