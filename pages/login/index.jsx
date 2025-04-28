import dynamic from "next/dynamic";
import Loader from "@/components/AuxComponents/Loader";

const LoginSection = dynamic(() => import("@/sections/Login/LoginSection"), {
    ssr: false,
    loading: () => <Loader />,
});
const login = () => {
    return (
        <>
            <LoginSection />
        </>
    );
}

export default login;