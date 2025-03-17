import WideCard from "@/components/Cards/WideCard";
import RecipeScrollVertical from "./RecipeScroll/RecipeScrollVertical";
import ShortCard from "./ShortCard";
import CategoryButton from "@/components/Buttons/CategoryButton";
import Search from "@/components/Controls/Search";

const HomeSection = () => {
    return (
        <section className="">
            <div className="w-full grid gap-4 py-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
                <WideCard />
                <WideCard />
                <WideCard />
                <ShortCard />
                <CategoryButton />
            </div>
            <Search  />
            <RecipeScrollVertical />
        </section>
    );
}


export default HomeSection