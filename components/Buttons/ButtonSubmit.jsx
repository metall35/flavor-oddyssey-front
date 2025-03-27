import GeneralButton from "./GeneralButton";

const ButtonSubmit = ({ text, loading, disabled }) => (
    <div className="flex justify-center mt-5">
        <GeneralButton
            text={loading ? "Cargando..." : text}
            type="submit"
            disabled={disabled}
            classes={`bg-flavor-2 shadow-flavor-2/50 hover:shadow-flavor-1/50 hover:bg-flavor-1 hover:scale-105 transition-transform duration-300 ${disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
        />
    </div>
);

export default ButtonSubmit