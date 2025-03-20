import { welcomeBackground, content } from "@/styles/welcome-section.module.css"
import Search from "@/components/Controls/Search";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { useEffect, useRef } from "react";
import ContentCategory from "@/components/Sections/ContentCategory";
import { TitleH1 } from "@/components/AuxComponents/Title";

const WelcomeSection = ({ categories }) => {
    const { setTargetRef } = useIntersectionObserver()
    const searchRef = useRef(null)

    useEffect(() => {
        console.log("myRef.current:", searchRef.current);
        if (searchRef.current) {
            setTargetRef(searchRef.current);
        }
    }, [setTargetRef, searchRef]);

    return (
        <section className={`w-full ${welcomeBackground} shadow-md `}>
            <div className={`py-24 lg:px-26 md:px-12 px-4 flex flex-col items-center ${content}`}>
                <TitleH1 text="¡Flavor Odyssey!" ref={searchRef} />
                <p className="max-w-120 text-balance text-center text-sm mt-2 text-black/60">Explora, califica y comenta recetas increíbles o pública las tuyas para compartir con la comunidad. ¡La cocina nunca fue tan interactiva!</p>
                <div className="w-full md:w-10/12 my-5">
                    <Search />
                </div>
                <ContentCategory data={categories.slice(0, 6)} style="max-w-16" className="md:grid hidden grid-cols-3 md:grid-cols-6" />
            </div>
        </section>
    )
}

export default WelcomeSection