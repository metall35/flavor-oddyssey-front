import { TitleH2 } from "@/components/AuxComponents/Title";
import ButtonSubmit from "@/components/Buttons/ButtonSubmit";
import NotifyError from "@/components/Errors/NotifyError";
import Input from "@/components/FormInputs/Input";
import useUpdateUser from "@/hooks/useUpdateUser";
import Image from "next/image";
import Link from "next/link";

const PerfilInformation = ({ user }) => {
    const { inputsUser, handlePhotoChange, handleChange, error, errorImg, handleSubmit, img } = useUpdateUser({ user });

    return (
        <form className="flex flex-col gap-5 items-center w-full" onSubmit={handleSubmit}>
            <div className="w-full mb-10">
                <TitleH2 text="Información del perfil" classes="text-start" />
            </div>
            <div className="flex justify-between items-center gap-14">
                <Image
                    src={img}
                    alt="Avatar"
                    width={200}
                    height={200}
                    className="w-25 h-25 rounded-full object-cover aspect-square"
                />
                <label className="cursor-pointer hover:text-flavor-2">
                    Cambiar foto
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoChange}
                    />
                </label>
                <NotifyError message={errorImg.message} status={errorImg.status} />
            </div>
            <Input label="Nombre de usuario" type="text" name="username" value={inputsUser.username} onChange={handleChange} error={{ status: false }} />
            <Input label="Correo electrónico" type="email" name="email" value={inputsUser.email} onChange={handleChange} disabled error={{ status: false }} />
            <ButtonSubmit text="Actualizar" loading={false} disabled={false} />
            <NotifyError message={error.message} status={error.status} />
            <div className="flex justify-between items-center gap-5">
                <Link href={"/cambiar-contraseña"}>Cambiar Contraseña</Link>
                <p className="text-red-500">Eliminar cuenta</p>
            </div>
        </form>
    )
}

export default PerfilInformation;