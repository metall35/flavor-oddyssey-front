import WideCard from "@/components/Cards/WideCard"

const SuggestRecipes = ({ data }) => {
    return (
        <div className="w-full md:w-1/2 md:pl-0 md:pr-10 px-4">
            <h3 className="w-full text-start text-2xl mb-10">Tambien te podria gustar</h3>
            <div className="flex flex-col items-center gap-8 w-full">
                {data == null || data.length == 0 ? <p>No hay sugerencias.</p> : (
                    <>
                        {data?.map(recipe => (
                            <WideCard key={recipe.id} data={recipe} />
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}

export default SuggestRecipes