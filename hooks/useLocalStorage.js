import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            if (typeof window === 'undefined') {
                return initialValue;
            }
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === key) {
                try {
                    const newValue = e.newValue ? JSON.parse(e.newValue) : initialValue;
                    if (JSON.stringify(storedValue) !== JSON.stringify(newValue)) {
                        setStoredValue(newValue);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [key, initialValue]); // Eliminamos storedValue de las dependencias

    return [storedValue, setValue];
}