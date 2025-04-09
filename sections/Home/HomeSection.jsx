import Container from "@/components/Sections/Container";
import ContentRecipe from "./ContentRecipe";
import WelcomeSection from "./WelcomeSection";
import ContentCategory from "@/components/Sections/ContentCategory";
import SectionCard from "./SectionCard";

const HomeSection = ({ data }) => {



    return (
        <>
            <WelcomeSection categories={data.categorias} />
            <ContentRecipe data={data.recetas} />
            <Container >
                <ContentCategory data={data.categorias.slice(0, 12)} style="max-w-26" className="md:grid hidden grid-cols-3 md:grid-cols-6 lg:grid-cols-12" />
            </Container>
            <SectionCard data={data.recetasLast} />
        </>
    );
}


export default HomeSection