import Image from "next/image"
import { CiTimer } from "react-icons/ci";
import { SiStagetimer } from "react-icons/si";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

// Component to display item information with an icon and text
export const ItemInfo = ({ text, icon, className }) => (
    <span className={`flex items-center gap-1 bg-amber-50/90 ${className} rounded-2xl shadow-md`}>
        {icon} {text}
    </span>
);

// Component to contain and display time and difficulty information
const ContainerItemsInfo = ({ time, difficulty }) => {
    return (
        <div className="absolute top-2 w-full flex justify-between px-4 text-black">
            <ItemInfo text={time} icon={<CiTimer size={18} />} className="px-1.5 py-1 text-xs" />
            <ItemInfo
                className="py-1 px-1.5 text-xs"
                text={difficulty}
                icon={
                    <SiStagetimer
                        size={18}
                        className={`
                            ${difficulty == "Fácil"
                                ? "fill-flavor-1"
                                : difficulty == "Intermedio"
                                    ? "fill-amber-400"
                                    : "fill-red-500"
                            }
                        `}
                    />
                }
            />
        </div>
    );
};

// Component to display an image with a gradient overlay
const ImageCard = ({ image, title }) => {
    return (
        <>
            <Image
                src={image}
                alt={title}
                width={1920}
                height={1080}
                // quality={80}
                placeholder="blur"
                blurDataURL="/image/recipe.png"
                className="rounded-lg h-auto aspect-video object-cover "
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/70 to-black/90 "></div>
        </>
    );
};

// Component to display card information such as title and likes
const CardInfo = ({ title, likes }) => {
    return (
        <div className="flex justify-between">
            <h3 className="text-xl font-light truncate">{title}</h3>
            <span className="flex items-center gap-1">
                <FaStar size={20} className="fill-amber-400" /> {likes}
            </span>
        </div>
    );
};

// Main CardLong component that combines all the above components
const WideCard = ({ data }) => {
    return (
        <Link href={{
            pathname: `/receta/${encodeURIComponent(data.name)}`,
            query: { id: data.id }
        }}>
            <div className="max-w-[396px] flex flex-col gap-2 max-h-[260px] hover:scale-105 transition-transform duration-300">
                <div className="relative rounded-xl overflow-hidden ">
                    <ContainerItemsInfo time={`${data.time}'`} difficulty={data.difficulty} />
                    <ImageCard image={data.image} title={data.name} />
                </div>
                <CardInfo title={data.name} likes="120" />
            </div >
        </Link>
    );
};

export default WideCard;