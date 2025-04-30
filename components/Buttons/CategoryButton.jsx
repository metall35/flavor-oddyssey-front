import Image from "next/image"
import { useRouter } from "next/router"

const CategoryButton = ({ classes, image, text, id }) => {

    const router = useRouter()

    const handleClick = () => {
        router.push({
            pathname: "/search",
            query: { q: "", filters: JSON.stringify({ categoryValue: id, time: '', difficulty: '', ingredients: [] }) }
        })
    }

    return (
        <button className={`${classes} text-sm text-center cursor-pointer`}
        onClick={handleClick}
        >
            <Image
                src={image}
                alt={text}
                width={296}
                height={296}
                quality={90}
                loading="lazy"
                placeholder="blur"
                blurDataURL="/image/recipe.png"
                className="rounded-full h-auto aspect-square object-cover "
            />
            {text}
        </button>
    )

}

export default CategoryButton