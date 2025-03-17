import { PiChefHat } from "react-icons/pi";


const ShortCard = () => {
    return (
        <div className="max-w-[225px] h-[225px] rounded-lg overflow-hidden shadow-lg shadow-gray-400 bg-flavor-3 px-4 py-2 flex flex-col justify-between hover:scale-90 transition-transform duration-300">
            <h3 className="text-3xl font-light text-white">Todas las categorías</h3>
            <div className="flex justify-between w-full">
                <div></div>
                <PiChefHat size={100} className="fill-flavor-2" />
            </div>
        </div>
    )
}

export default ShortCard