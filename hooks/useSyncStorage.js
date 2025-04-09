// hooks/useSyncStorage.js
import { useCallback } from 'react';
import Cookies from 'js-cookie';
import { useLocalStorage } from './useLocalStorage';

export const useSyncStorage = (key, initialValue) => {
    const [value, setValue] = useLocalStorage(key, initialValue);

    const syncWithCookies = useCallback((specificValue) => {
        try {
            const valueToSync = specificValue !== undefined ? specificValue : value;
            Cookies.set(key, JSON.stringify(valueToSync), {
                expires: 365,
                path: '/',
                sameSite: 'Lax'
            });
        } catch (error) {
            console.error('Error al sincronizar:', error);
        }
    }, [key, value]);

    const setValueAndSync = useCallback((newValue) => {
        setValue(prevValue => {
            const resolvedValue = typeof newValue === 'function' ? newValue(prevValue) : newValue;
            syncWithCookies(resolvedValue)
            return resolvedValue;
        });
    }, [setValue, syncWithCookies]);

    return [value, setValueAndSync, syncWithCookies];
}