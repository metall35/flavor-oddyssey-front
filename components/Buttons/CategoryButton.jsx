import Image from "next/image"

const CategoryButton = () => {
    return (
        <button className="max-w-24">
            <Image
                src={"/image/recipe.png"}
                alt="recipe"
                width={96}
                height={96}
                quality={80}
                placeholder="blur"
                blurDataURL="/image/recipe.png"
                className="rounded-full h-auto object-cover "
            />
            Categoria
        </button>
    )

}

export default CategoryButton