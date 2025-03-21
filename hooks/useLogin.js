import { CREATE_USER } from '@/graphql/mutations/LOGIN-MUTATIONS';
import { useMutation } from '@apollo/client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useLogin = () => {
    const [selectedTab, setSelectedTab] = useState('login');
    const [errorRegister, setErrorRegister] = useState({ status: false, message: '' });
    const [errorLogin, setErrorLogin] = useState({ status: false, message: '' });

    const router = useRouter();

    const [Register, resultRegister] = useMutation(CREATE_USER, {
        onError: (error) => {
            setErrorRegister({ status: true, message: "Algo salio mal." });
        }
    });

    useEffect(() => {

        if (resultRegister.data) {
            Cookies.set('tokenFlavorOdyssey ', resultRegister.data.createUser.token, { expires: 1 / 24 });
            router.push('/');
        }

    }, [resultRegister.data]);


    const handleLoginSubmit = (e) => {
        e.preventDefault();

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
        errorLogin
    }
}
