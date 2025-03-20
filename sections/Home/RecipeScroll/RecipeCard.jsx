
import Image from "next/image";

const RecipeCard = ({ image, name, time, difficulty, autor }) => {
    return (
        <figure
            className="group relative max-h-96 cursor-pointer overflow-hidden rounded-xl border"
        >
            <Image
                src={image}
                alt="recipe"
                width={396}
                height={220}
                quality={80}
                placeholder="blur"
                blurDataURL="/image/recipe.png"
                className="rounded-lg h-auto aspect-square object-cover"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity hover:opacity-100 duration-500 flex flex-col justify-center p-4 gap-2">
                <div className="flex flex-col justify-center p-4 gap-2">
                    <h3 className="text-xl font-light text-white">{name}</h3>
                    <p className="text-sm font-light text-white">tiempo: {time}' dificultad: {difficulty} </p>
                    <p className="text-xs font-light text-white">{autor.username}</p>
                </div>
            </div>
        </figure>
    );
};

export default RecipeCard