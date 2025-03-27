import { TitleH2 } from "@/components/AuxComponents/Title";
import WideCard from "@/components/Cards/WideCard";


const UserLikes = ({ likes, title }) => {
    return (
        <section className="w-full flex flex-col items-center">
            <div className="w-full mb-10">
                <TitleH2 text={title} classes="text-start" />
            </div>
            {
                likes?.length === 0 && (
                    <div className="w-full text-center text-lg">No has guardado recetas.</div>
                )
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {likes?.map((like) => (
                    <WideCard key={like.id} data={like.receta} />
                ))}
            </div>
        </section>
    )
}

export default UserLikes;