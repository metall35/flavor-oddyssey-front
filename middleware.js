import { NextResponse } from 'next/server';

export function middleware(request) {
    const url = request.nextUrl.clone();
    const currentPath = url.pathname; // Guardamos la ruta actual antes de modificarla

    const privatePaths = ["/crear-receta", "/perfil", "/perfil/informacion-personal", "/perfil/recetas", "/perfil/likes"];
    // const privatePaths = [];
    const isPrivatePath = privatePaths.some(path => currentPath === path);

    // console.log('Middleware executed');
    // console.log('Current Path:', currentPath);
    // console.log('Is Private Path:', isPrivatePath);

    // Verifica si la ruta es privada
    if (!isPrivatePath) {
        console.log('Public path, allowing access');
        return NextResponse.next();
    }

    // Obtiene el token de la sesión
    const token = request.cookies.get('tokenFlavorOdyssey')?.value;

    // console.log('Token:', token);

    // Si no hay token, redirigir al inicio de sesión
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        // Guardamos la ruta original (currentPath) en el parámetro returnUrl
        loginUrl.searchParams.set('returnUrl', currentPath);
        // console.log('Redirecting to:', loginUrl.toString());
        return NextResponse.redirect(loginUrl);
    }

    // Continuar con la solicitud si hay un token
    console.log('Token found, allowing access');
    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};