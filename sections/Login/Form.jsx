import GeneralButton from "@/components/Buttons/GeneralButton";
import NotifyError from "@/components/Errors/NotifyError";
import Input from "@/components/FormInputs/Input";

const ButtonSubmit = ({ text }) => (
    <div className="flex justify-center mt-5">
        <GeneralButton
            text={text}
            type="submit"
            classes="bg-flavor-2 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300"
        />
    </div>
);

const Form = ({ children, onSubmit, error }) => {
    return (
        <form className="flex flex-col w-full gap-2 justify-center lg:px-10 sm:px-20 px-2" onSubmit={onSubmit}>
            <NotifyError status={error.status} message={error.message} />
            {children}
        </form>
    )
}

export const FormLogin = ({ handleSubmit, error}) => {
    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Input type="email" name="email" label="Correo electrónico" required error={{ status: error.status }} />
            <Input type="password" name="password" label="Contraseña" required error={{ status: error.status }} />
            <ButtonSubmit text="Iniciar sesión" />
        </Form>
    );
};

export const FormRegister = ({ handleSubmit, error }) => {
    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Input type="text" name="username" label="Nombre de usuario" required error={{ status: error.status }} />
            <Input type="email" name="email" label="Correo electrónico" required error={{ status: error.status }} />
            <Input type="password" name="password" label="Contraseña" required error={{ status: error.status }} />
            <ButtonSubmit text="Registrarse" />
        </Form>
    );
};