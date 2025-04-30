import { CREATE_USER, LOGIN } from '@/graphql/mutations/LOGIN-MUTATIONS';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useUser } from './useUser';
import toast from 'react-hot-toast';
import { useAuthStore } from './useStore';

export const useLogin = () => {
    const [selectedTab, setSelectedTab] = useState('login');
    const [errorRegister, setErrorRegister] = useState({ status: false, message: '' });
    const [errorLogin, setErrorLogin] = useState({ status: false, message: '' });
    const { refetch } = useUser()
    const { login } = useAuthStore()
    const router = useRouter()
    const { returnUrl } = router.query

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


    useEffect(() => {

        if (resultRegister.data) {
            login(resultRegister.data.createUser.token)
            toast.success("Te has registrado con éxito.", {
                duration: 5000
            })
            router.push(returnUrl || "/");
            refetch()
        }

        if (resultLogin.data) {
            login(resultLogin.data.tokenAuth.token)
            toast.success("Iniciaste sesión.", {
                duration: 5000
            })
            router.push(returnUrl || '/');
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
