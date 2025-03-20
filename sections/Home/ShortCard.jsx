

const ShortCard = ({icon, title}) => {
    return (
        <div className="max-w-[225px] h-[175px] rounded-lg overflow-hidden shadow-lg shadow-gray-400 bg-flavor-3 px-4 py-2 flex flex-col justify-between hover:scale-90 transition-transform duration-300">
            <h3 className="text-2xl font-light text-white">{title}</h3>
            <div className="flex justify-between w-full">
                <div></div>
                {icon}
            </div>
        </div>
    )   
}

export default ShortCard