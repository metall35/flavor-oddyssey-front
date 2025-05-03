import Search from "@/components/Controls/Search";
import useSearch from "@/hooks/useSearch";

const SearchBar = ({ isVisibleSearch }) => {
    const {
        setFiltersValue,
        viewIngredients
    } = useSearch()

    return (
        <>
            {isVisibleSearch && (
                <div className="w-full bg-white animate-slide-down shadow-md p-5 flex justify-between items-center flex-wrap-reverse border ">
                    <div className="flex gap-4 flex-wrap h-8 mx-10">
                            {viewIngredients.map(ingredient => (
                                <span key={ingredient.id} className="flex items-center gap-1 rounded-full py-1 px-2 border text-sm">
                                    {ingredient.name}
                                    <button
                                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                                        onClick={() =>
                                            setFiltersValue((prev) => ({
                                                ...prev,
                                                ingredients: prev.ingredients.filter(item => item !== ingredient.id),
                                            }))}
                                    >
                                        x
                                    </button>
                                </span>
                            ))}
                        </div>
                    <div className="md:w-1/2 w-full block">
                        <Search />
                    </div>
                </div>
            )}
        </>
    )
}

export default SearchBar;
