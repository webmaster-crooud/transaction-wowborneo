const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/booking-itinerary', // URL custom
                destination: '/booking', // URL internal
            },
            {
                source: '/guest-details', // URL custom
                destination: '/guest', // URL internal
            },
        ];
    },
    images: {
        domains: ['is3.cloudhost.id'],
    },
    // async redirects() {
    //     return [
    //         {
    //             source: '/old-url', // URL lama
    //             destination: '/new-url', // URL baru
    //             permanent: true, // Redirect permanen (301)
    //         },
    //     ];
    // },
    // images: {
    //     domains: ['example.com'], // Domain yang diizinkan untuk optimisasi gambar
    // },
    // Opsi lainnya
};

export default nextConfig;
