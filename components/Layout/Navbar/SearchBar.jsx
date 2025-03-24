import Search from "@/components/Controls/Search";


const SearchBar = ({ isVisibleSearch }) =>
    isVisibleSearch && (
        <div className="w-full bg-white animate-slide-down shadow-md p-5 flex justify-between flex-wrap border ">
            <div></div>
            <div className="md:w-1/2 w-full block">
                <Search />
            </div>
        </div>
    );

export default SearchBar;
