import Loader from "@/components/AuxComponents/Loader";
import { useUser } from "@/hooks/useUser";
import PerfilSection from "@/sections/perfil/PerfilSection";
import dynamic from "next/dynamic";

// const PerfilSection = dynamic(() => import("@/sections/perfil/PerfilSection"), {
//     ssr: false,
//     loading: () => <Loader />,
// });

const Perfil = () => {
    const { data, loading } = useUser();

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <PerfilSection data={data} />
        </>
    );
};


export default Perfil;
