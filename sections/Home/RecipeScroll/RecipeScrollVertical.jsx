import { Marquee } from "@/components/magicui/marquee";
import RecipeCard from "./RecipeCard";
import Link from "next/link";

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "/image/recipe.png",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "/image/recipe.png",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "/image/recipe.png",
    },
];



const RecipeScrollVertical = ({ data }) => {
    const firstRow = data.slice(0, data.length / 2);
    const secondRow = data.slice(data.length / 2);

    return (
        <div className="relative flex h-[500px] w-9/12 flex-row items-center justify-center overflow-hidden">
            <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstRow.map((review) => (
                    <Link href={{
                        pathname: `/receta/${encodeURIComponent(review.name)}`,
                        query: { id: review.id }
                    }}>
                        <RecipeCard key={review.username} {...review} />
                    </Link>
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                {secondRow.map((review) => (
                    <Link href={{
                        pathname: `/receta/${encodeURIComponent(review.name)}`,
                        query: { id: review.id }
                    }}>
                        <RecipeCard key={review.username} {...review} />
                    </Link>
                ))}
            </Marquee>
            <Marquee pauseOnHover vertical className="[--duration:20s]">
                {firstRow.map((review) => (
                    <Link href={{
                        pathname: `/receta/${encodeURIComponent(review.name)}`,
                        query: { id: review.id }
                    }}>
                        <RecipeCard key={review.username} {...review} />
                    </Link>
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                {secondRow.map((review) => (
                    <Link href={{
                        pathname: `/receta/${encodeURIComponent(review.name)}`,
                        query: { id: review.id }
                    }}> 
                        <RecipeCard key={review.username} {...review} />
                    </Link>
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        </div>
    );
}

export default RecipeScrollVertical
