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
            {
                protocol: 'http',
                hostname: 'localhost', 
                port: '8000',
                pathname: '/media/users/**',
            },
            
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com', 
                pathname: '/**', 
            },
            // {
            //     protocol: 'https',
            //     hostname: 'res.cloudinary.com', 
            //     pathname: '/media/categorias/**',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'res.cloudinary.com', 
            //     pathname: '/media/users/**',
            // },

        ],
    },
};