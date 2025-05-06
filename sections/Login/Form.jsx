import ButtonSubmit from "@/components/Buttons/ButtonSubmit";
import NotifyError from "@/components/Errors/NotifyError";
import Input from "@/components/FormInputs/Input";



const Form = ({ children, onSubmit, error }) => {
    return (
        <form className="flex flex-col w-full gap-2 has-last:mt-3 justify-center lg:px-10 sm:px-20 px-2" onSubmit={onSubmit}>
            <NotifyError status={error.status} message={error.message} />
            {children}
        </form>
    )
}

export const FormLogin = ({ handleSubmit, error, loading }) => {
    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Input type="email" name="email" label="Correo electrónico" required error={{ status: error.status }} />
            <Input type="password" name="password" label="Contraseña" required error={{ status: error.status }} />
            <div className="mt-5">
                <ButtonSubmit text="Iniciar sesión" loading={loading} disabled={loading} />
            </div>
        </Form>
    );
};

export const FormRegister = ({ handleSubmit, error, loading }) => {
    return (
        <Form onSubmit={handleSubmit} error={error}>
            <Input type="text" name="username" label="Nombre de usuario" required error={{ status: error.status }} />
            <Input type="email" name="email" label="Correo electrónico" required error={{ status: error.status }} />
            <Input type="password" name="password" label="Contraseña" required error={{ status: error.status }} />
            <div className="mt-5">
                <ButtonSubmit text="Registrarse" loading={loading} disabled={loading} />
            </div>
        </Form>
    );
};