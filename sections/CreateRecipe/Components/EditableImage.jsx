import useCreateRecipe from "@/hooks/useCreateRecipe"
import Image from "next/image"

const EdtiableImage = () => {

    const {img, handlePhotoChange} = useCreateRecipe()

    return (
        <div className="relative rounded-lg overflow-hidden md:w-6/12 w-full">
            <Image
                src={img || "/image/recipe.png"}
                alt={"recipe image"}
                width={1920}
                height={1080}
                placeholder="blur"
                quality={90}
                blurDataURL="/image/recipe.png"
                className="rounded-lg h-full aspect-video object-cover"
            />
            <label className="absolute inset-0 cursor-pointer text-white hover:bg-black/50 bg-black/30 flex items-center justify-center transition-all duration-300 ease-in-out">
                Cambiar imagen
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                />
            </label>
        </div>
    )
}

export default EdtiableImage