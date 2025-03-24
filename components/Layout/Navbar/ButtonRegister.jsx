import GeneralButton from "@/components/Buttons/GeneralButton";
import { useRouter } from "next/router";


const ButtonRegister = () => {

    const router = useRouter()

    const handleClick = () => {
        router.push("/login")
    }


    return (
        <GeneralButton onClick={handleClick}  text="Registrarse" classes="bg-flavor-2 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300 " />
    );
}

export default ButtonRegister;
