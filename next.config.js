// next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost', 
                port: '8000', 
                pathname: '/media/recetas/**', 
            },
            {
                protocol: 'http',
                hostname: 'localhost', 
                port: '8000',
                pathname: '/media/categorias/**',
            },
        ],
    },
};