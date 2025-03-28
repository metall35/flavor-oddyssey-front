import GeneralButton from "@/components/Buttons/GeneralButton";
import { useRouter } from "next/router";


const ButtonLogIn = () => {
    const router = useRouter()

    const handleClick = () => {
        router.push("/login")
    }

    return (
        <GeneralButton onClick={handleClick} text="Iniciar sesión" classes="bg-gray-400 shadow-gray-400/50 hover:shadow-gray-500/50 hover:bg-gray-500 hover:scale-105 transition-transform duration-300 " />
    );

}

export default ButtonLogIn;
