import { useRouter } from "next/router";
import { useState } from "react";


const useSearch = () => {
    const [searchValue, setSearchValue] = useState("")
    const [error, setError] = useState({
        status: false,
        message: ""
    })

    const router = useRouter()

    const onChangeSearch = (e) => {
        const { value } = e.target
        setSearchValue(value)
        if (value.length <= 1) {
            setError({ ...error, status: false, message: "" })
        }
    }

    const handleSearch = (e) => {
        e.preventDefault()
        if (searchValue.trim()) {
            router.push({
                pathname: "/search",
                query: { q: searchValue }
            })
        } else {
            setError({ ...error, status: true, message: "No has ingresado un valor" })
        }
    }

    return {
        searchValue,
        onChangeSearch,
        handleSearch,
        error
    }
}
export default useSearch