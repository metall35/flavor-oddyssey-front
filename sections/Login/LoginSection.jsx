import Image from 'next/image';
import { FormLogin, FormRegister } from './Form';
import { useLogin } from '@/hooks/useLogin';

const LoginSection = () => {
    const { 
        selectedTab, 
        setSelectedTab, 
        handleRegisterSubmit, 
        errorLogin, 
        errorRegister, 
        handleLoginSubmit, 
        loadingLogin, 
        loadingRegister 
    } = useLogin();
    return (
        <section className='flex md:flex-col-reverse lg:flex-row gap-4 p-4 md:p-8 w-full mt-10 mb-92 md:mb-30 lg:mb-12'>
            <Image
                src="/image/image-login.jpg"
                alt="Login"
                width={500}
                height={500}
                quality={80}
                placeholder="blur"
                blurDataURL="/image/image-login.jpg"
                className="rounded-2xl h-auto aspect-video object-cover w-5xl hidden md:block"
            />
            <div className='flex flex-col gap-4 lg:w-1/2 w-full p-5 bg-white rounded-2xl shadow-lg'>
                <div className="flex mb-4 w-full ">
                    <button
                        className={`relative pb-2 text-lg font-medium hover:text-flavor-2 w-1/2 ${selectedTab === 'login' ? 'text-flavor-2' : 'text-black/50'}`}
                        onClick={() => setSelectedTab('login')}
                    >
                        Iniciar Sesión
                        {selectedTab === 'login' && (
                            <span className="absolute left-0 bottom-0 w-full h-1 bg-flavor-2"></span>
                        )}
                    </button>
                    <button
                        className={`relative pb-2 text-lg font-medium hover:text-flavor-2 w-1/2 ${selectedTab === 'register' ? 'text-flavor-2' : 'text-black/50'}`}
                        onClick={() => setSelectedTab('register')}
                    >
                        Registrarse
                        {selectedTab === 'register' && (
                            <span className="absolute left-0 bottom-0 w-full h-1 bg-flavor-2"></span>
                        )}
                    </button>
                </div>
                {
                    selectedTab === 'login' ? (
                        <FormLogin error={errorLogin} handleSubmit={handleLoginSubmit} loading={loadingLogin} />
                    ) : (
                        <FormRegister error={errorRegister} handleSubmit={handleRegisterSubmit} loading={loadingRegister} />
                    )
                }
            </div>
        </section>
    )
}

export default LoginSection