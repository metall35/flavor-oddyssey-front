import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Container from "@/components/Sections/Container";
import SlideNav from "@/sections/perfil/SlideNav";
import Loader from "@/components/AuxComponents/Loader";
import dynamic from "next/dynamic";

const PerfilInformation = dynamic(() => import("./PerfilInformation"), {
    ssr: false,
    loading: () => <Loader />,
});

const UserRecipes = dynamic(() => import("./UserRecipes"), {
    ssr: false,
    loading: () => <Loader />,
});

const UserLikes = dynamic(() => import("./UserLikes"), {
    ssr: false,
    loading: () => <Loader />,
});

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
        return <Loader />
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
        <Container className="flex gap-10 pb-10">
            <SlideNav onNavigate={handleNavigation} section={activeContent} />
            <div className="flex-1">{renderContent()}</div>
        </Container>
    );
}

export default PerfilSection;