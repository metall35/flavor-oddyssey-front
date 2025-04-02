import { CREATE_USER, LOGIN } from '@/graphql/mutations/LOGIN-MUTATIONS';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

export const useLogin = () => {
    const [selectedTab, setSelectedTab] = useState('login');
    const { refetch } = useUser()
    const [errorRegister, setErrorRegister] = useState({ status: false, message: '' });
    const [errorLogin, setErrorLogin] = useState({ status: false, message: '' });

    const router = useRouter();

    const [Register, resultRegister] = useMutation(CREATE_USER, {
        onError: (error) => {
            setErrorRegister({ status: true, message: "Algo salio mal." });
        }
    });

    const [Login, resultLogin] = useMutation(LOGIN, {
        onError: (error) => {
            setErrorLogin({ status: true, message: "el nombre de usuario o la contraseña son incorrectos." });
        }
    });

    console.log(resultLogin)

    useEffect(() => {

        if (resultRegister.data) {
            Cookies.set('tokenFlavorOdyssey', resultRegister.data.createUser.token, { expires: 1 / 24 });
            toast.success("Te has registrado con éxito.", {
                duration: 5000
            })
            router.push('/');
            refetch()
        }

        if (resultLogin.data) {
            Cookies.set('tokenFlavorOdyssey', resultLogin.data.tokenAuth.token, { expires: 1 / 24 });
            toast.success("Iniciaste sesión.", {
                duration: 5000
            })
            router.push('/');
            refetch()
        }

    }, [resultRegister.data, resultLogin.data]);


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (email === '' || password === '') {
            setErrorLogin({ status: true, message: "Todos los campos son obligatorios." });
        } else {
            setErrorLogin({ status: false, message: "" });
            try {
                Login({
                    variables: {
                        email,
                        password
                    }
                });
            } catch (error) {
                setErrorLogin({ status: true, message: "Algo a salido mal." });
            }
        }

    }

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        if (username === '' || email === '' || password === '') {
            setErrorRegister({ status: true, message: "Todos los campos son obligatorios." });
        } else {
            setErrorRegister({ status: false, message: "" });

            try {
                await Register({
                    variables: {
                        username,
                        email,
                        password
                    }
                });
            } catch (error) {
                setErrorRegister({ status: true, message: "Algo a salido mal." });
            }

        }
    }

    return {
        selectedTab,
        setSelectedTab,
        handleLoginSubmit,
        handleRegisterSubmit,
        errorRegister,
        errorLogin,
        loadingLogin: resultLogin.loading,
        loadingRegister: resultRegister.loading
    }
}
