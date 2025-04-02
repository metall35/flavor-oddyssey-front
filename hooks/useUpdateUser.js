import { USER_PERFIL_QUERY } from '@/graphql/USER-QUERY';
import { UPDATE_USER_MUTATION } from '@/graphql/mutations/USER-MUTATIONS';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import toast from 'react-hot-toast';


const useUpdateUser = ({ user }) => {
    const [errorImg, setErrorImg] = useState({ message: '', status: false });
    const [error, setError] = useState({ message: '', status: false });
    const [inputsUser, setUser] = useState({
        username: user.username,
        email: user.email,
        photo: user.photo,
    })
    const [img, setImg] = useState(user.photo);

    const handlePhotoChange = e => {
        const file = e.target.files[0];
        const maxFileSize = 5 * 1024 * 1024; // 5MB in bytes

        if (file) {
            if (file.size > maxFileSize) {
                setErrorImg({
                    message: 'El archivo es demasiado grande',
                    status: true
                });
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                setUser((prevState) => ({
                    ...prevState,
                    photo: e.target.files[0],
                }));
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

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
        errorImg,
        handleSubmit,
        img
    }
}

export default useUpdateUser