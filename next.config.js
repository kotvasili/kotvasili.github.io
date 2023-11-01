/** @type {import('next').NextConfig} */
module.exports = {
    poweredByHeader: false,
    images: {
        domains: ['images.ctfassets.net'],
    },
    experimental: { optimizeCss: true },
    async rewrites() {
        return [
            {
                source: '/terms.html',
                destination: '/terms',
            },
            {
                source: '/support.html',
                destination: '/support',
            },
            {
                source: '/pp.html',
                destination: '/pp',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ({resource}) => [{
                loader: '@svgr/webpack',
                options: {
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'preset-default',
                                params: {
                                    overrides: {
                                        removeViewBox: false,
                                    },
                                },
                            },
                            'prefixIds',
                        ]
                    },
                },
            }],
        });
        return config;
    },
};
