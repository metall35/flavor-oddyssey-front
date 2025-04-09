import { useRouter } from "next/router";
import { useState } from "react";
import { useSyncStorage } from "./useSyncStorage";

const useSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [error, setError] = useState({
        status: false,
        message: ""
    })
    const [searchHistory, setSearchHistory] = useSyncStorage("searchHistoryFlavor", [])

    const router = useRouter()

    const onChangeSearch = (e) => {
        const { value } = e.target;
        setSearchValue(value);
        if (value.length > 1 && error.status) {
            setError({ status: false, message: "" })
        }
    }

    const handleSearch = async (e) => {
        e.preventDefault()

        if (!searchValue.trim()) {
            setError({ status: true, message: "No has ingresado un valor" })
            return
        }

        await router.push({
            pathname: "/search",
            query: { q: searchValue }
        })

        if (!searchHistory?.includes(searchValue)) {
            setSearchHistory(prev => prev ? [...prev, searchValue] : [searchValue])
        }
    }

    return {
        searchValue,
        onChangeSearch,
        handleSearch,
        error,
    }
}

export default useSearch