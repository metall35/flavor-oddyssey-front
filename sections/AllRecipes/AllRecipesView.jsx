import { TitleH2 } from "@/components/AuxComponents/Title"
import WideCard from "@/components/Cards/WideCard"
import Container from "@/components/Sections/Container"


const AllRecipesView = ({ data, title }) => {
    
    return (
        <Container className="mb-10">
            <TitleH2 text={title} classes="mb-5" />
            <div className="gap-4 md:gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
                {data?.map(recipe => (
                    <WideCard key={recipe.id} data={recipe} />
                ))}
            </div>
        </Container>
    )

}

export default AllRecipesView