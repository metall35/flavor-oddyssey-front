import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Sections/Container";
import SlideNav from "@/sections/perfil/SlideNav";
import PerfilInformation from "./PerfilInformation";
import UserRecipes from "./UserRecipes";
import UserLikes from "./UserLikes";

const PerfilSection = ({ data }) => {
    const router = useRouter();
    const { section } = router.query;
    const [activeContent, setActiveContent] = useState("informacion-personal");

    useEffect(() => {

        if (section) {
            setActiveContent(section[0]);
        }
    }, [section]);


    if (!data) {
        return <div>Cargando...</div>;
    }

    const handleNavigation = (newSection) => {
        setActiveContent(newSection);
        router.push(`/perfil/${newSection}`, undefined, { shallow: true });
    };

    const renderContent = () => {
        switch (activeContent) {
            case "informacion-personal":
                return <PerfilInformation user={data} />;
            case "recetas":
                return <UserRecipes recipes={data.recetas} title="Recetas creadas" />;
            case "likes":
                return <UserLikes likes={data.calificaciones} title="Recetas guardadas" />;
            default:
                return <div>Contenido no encontrado</div>;
        }
    };

    return (
        <Container className="flex gap-10 pb-10 lg:h-[calc(100vh-12rem)]">
            <SlideNav onNavigate={handleNavigation} section={activeContent} />
            <div className="flex-1">{renderContent()}</div>
        </Container>
    );
}

export default PerfilSection;