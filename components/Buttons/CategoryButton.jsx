import Image from "next/image"

const CategoryButton = ({ classes, image, text }) => {
    return (
        <button className={`${classes} text-sm text-center`}>
            <Image
                src={image}
                alt={text}
                width={296}
                height={296}
                quality={90}
                placeholder="blur"
                blurDataURL="/image/recipe.png"
                className="rounded-full h-auto aspect-square object-cover "
            />
            {text}
        </button>
    )

}

export default CategoryButton