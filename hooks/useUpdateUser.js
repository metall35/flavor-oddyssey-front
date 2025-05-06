import { USER_PERFIL_QUERY } from '@/graphql/USER-QUERY';
import { UPDATE_USER_MUTATION } from '@/graphql/mutations/USER-MUTATIONS';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import useHandlePhotoChange from './useHandlePhotoChange';


const useUpdateUser = ({ user }) => {
    const [error, setError] = useState({ message: '', status: false });
    const [inputsUser, setUser] = useState({
        username: user.username,
        email: user.email,
        photo: user.photo,
    })
    const { handlePhotoChange, img } = useHandlePhotoChange({ initialPhoto:user.photo, updatePhoto: setUser })

    const handleChange = e => {
        setUser({
            ...inputsUser,
            [e.target.name]: e.target.value
        });
    }

    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        onError: (error) => {
            setError({
                message: error.message,
                status: true
            });
        },
        update: (store, { data }) => {
            const dataInCache = store.readQuery({ query: USER_PERFIL_QUERY })
            store.writeQuery({
                query: USER_PERFIL_QUERY,
                data: {
                    ...dataInCache,
                    currentUser: data.updateUser.user
                }
            })
        }
    })

    const handleSubmit = e => {
        e.preventDefault();
        try {
            const updatedFields = Object.fromEntries(
                Object.entries(inputsUser).filter(([key, value]) => value !== user[key])
            );

            if (Object.keys(updatedFields).length > 0) {
                updateUser({
                    variables: {
                        ...updatedFields,
                        id: user.id
                    }
                });
            }
            toast.success('Perfil actualizado');
        } catch (error) {
            setError({
                message: 'Algo salió mal',
                status: true
            });
        }
    }

    return {
        inputsUser,
        handlePhotoChange,
        handleChange,
        error,
        handleSubmit,
        img
    }
}

export default useUpdateUser