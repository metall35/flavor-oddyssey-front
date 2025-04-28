import Container from "@/components/Sections/Container";
import WelcomeSection from "./WelcomeSection";
import dynamic from "next/dynamic";
import Loader from "@/components/AuxComponents/Loader";
import SectionCard from "./SectionCard";

const ContentRecipe = dynamic(() => import("./ContentRecipe"), {
    loading: () => <Loader />
})

const ContentCategory = dynamic(() => import("@/components/Sections/ContentCategory"), {
    loading: () => <Loader />
})



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