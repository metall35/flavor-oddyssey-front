import { Marquee } from "@/components/magicui/marquee";
import RecipeCard from "./RecipeCard";
import Link from "next/link";


const RecipeScrollVertical = ({ data }) => {
    const firstRow = data.slice(0, data.length / 2);
    const secondRow = data.slice(data.length / 2);

    return (
        <div className="relative flex md:h-[500px] md:w-9/12 w-full flex-row items-center justify-center overflow-hidden">
            {/* mobile Marquee */}
            <div className="md:hidden">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <Link href={{
                            pathname: `/receta/${encodeURIComponent(review.name)}`,
                            query: { id: review.id }
                        }}>
                            <RecipeCard key={review.username} {...review} />
                        </Link>
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <Link href={{
                            pathname: `/receta/${encodeURIComponent(review.name)}`,
                            query: { id: review.id }
                        }}>
                            <RecipeCard key={review.username} {...review} />
                        </Link>
                    ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review) => (
                        <Link href={{
                            pathname: `/receta/${encodeURIComponent(review.name)}`,
                            query: { id: review.id }
                        }}>
                            <RecipeCard key={review.username} {...review} />
                        </Link>
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:20s]">
                    {secondRow.map((review) => (
                        <Link href={{
                            pathname: `/receta/${encodeURIComponent(review.name)}`,
                            query: { id: review.id }
                        }}>
                            <RecipeCard key={review.username} {...review} />
                        </Link>
                    ))}
                </Marquee>
            </div>

            {/* Desktop Marquee */}
            <div className="hidden md:block">
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
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        </div>
    );
}

export default RecipeScrollVertical
