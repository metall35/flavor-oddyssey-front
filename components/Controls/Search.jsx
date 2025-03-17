import useSearch from "@/hooks/useSearch";
import { IoIosSearch } from "react-icons/io";
import NotifyError from "../Errors/NotifyError";


const Search = () => {

    const { searchValue, onChangeSearch, handleSearch, error } = useSearch()

    return (
        <>
            <form onSubmit={handleSearch} className="relative w-full">
                {/* Input de búsqueda */}
                <input
                    type="search"
                    placeholder="Busca receta, cultura o ingrediente"
                    value={searchValue}
                    onChange={onChangeSearch}
                    className={`w-full py-3 pl-6 pr-12 border shadow-lg rounded-full focus:outline-none ${error.status && "ring-2 ring-red-400"} focus:ring-2 focus:ring-flavor-2`}
                />

                {/* Ícono de búsqueda (opcional) */}


                {/* Botón de búsqueda */}
                <button
                    type="Submit"
                    className="absolute cursor-pointer right-0 top-1/2 h-full transform -translate-y-1/2 px-6 bg-flavor-2 hover:bg-flavor-1 text-white transition-transform duration-300 rounded-br-full rounded-tr-full flex gap-1 items-center text-lg"
                >
                    <IoIosSearch size={24} />
                    Buscar
                </button>
            </form>
            <NotifyError status={error.status} message={error.message} />
        </>
    )
}

export default Search