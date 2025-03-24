
import { useEffect, useState } from 'react';
import { useAuthStore } from './useStore';


const useRedirect = ({ DestinationPath }) => {
    const [path, setPath] = useState("/login");

    const { token } = useAuthStore();


    useEffect(() => {
        if (token) {
            setPath(DestinationPath);
        }
    }, [token])

    return {
        path,
    }
}

export default useRedirect