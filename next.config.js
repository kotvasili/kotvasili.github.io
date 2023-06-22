/** @type {import('next').NextConfig} */
module.exports = {
    poweredByHeader: false,
    images: {
        domains: ['images.ctfassets.net'],
    },
    experimental: { optimizeCss: true },
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
