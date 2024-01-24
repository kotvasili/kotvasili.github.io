const _ = require("lodash");

const { configureRuntimeEnv } = require('next-runtime-env/build/configure');
const { makeEnvPublic } = require('next-runtime-env/build/make-env-public');

makeEnvPublic(['PUBLIC_API', 'MOTO_URL', 'MOTO_MERCHANT_ID', 'MOTO_ENV', 'APP_HOST_URL']);
configureRuntimeEnv();

const config = {
  http: 'http://',
  https: 'https://',
};

const API_URL = process.env.PUBLIC_API;

function removeHttp(url) {
  if (url?.startsWith(config.http)) {
    return url.slice(config.http.length);
  }

  if (url?.startsWith(config.https)) {
    return url.slice(config.https.length);
  }

  return url;
}

const BABEL_LOADER_STRING = "babel/loader";
const makeLinariaLoaderConfig = babelOptions => ({
  loader: require.resolve("@linaria/webpack-loader"),
  options: {
    sourceMap: true,
    extension: ".linaria.module.css",
    babelOptions: _.omit(
      babelOptions,
      "isServer",
      "distDir",
      "pagesDir",
      "development",
      "hasReactRefresh",
      "hasJsxRuntime",
      "hasServerComponents"
    ),
  },
});

let injectedBabelLoader = false;
function crossRules(rules) {
  for (const rule of rules) {
    if (typeof rule.loader === "string" && rule.loader.includes("css-loader")) {
      if (rule.options && rule.options.modules && typeof rule.options.modules.getLocalIdent === "function") {
        const nextGetLocalIdent = rule.options.modules.getLocalIdent;
        rule.options.modules.mode = "local";
        rule.options.modules.auto = true;
        rule.options.modules.exportGlobals = true;
        rule.options.modules.exportOnlyLocals = true;
        rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
          if (context.resourcePath.includes(".linaria.module.css")) {
            return exportName;
          }
          return nextGetLocalIdent(context, _, exportName, options);
        };
      }
    }

    if (typeof rule.use === "object") {
      if (Array.isArray(rule.use)) {
        const babelLoaderIndex = rule.use.findIndex(
          ({ loader }) => typeof loader === "string" && loader.includes(BABEL_LOADER_STRING)
        );

        const babelLoaderItem = rule.use[babelLoaderIndex];

        if (babelLoaderIndex !== -1) {
          rule.use = [
            ...rule.use.slice(0, babelLoaderIndex),
            babelLoaderItem,
            makeLinariaLoaderConfig(babelLoaderItem.options),
            ...rule.use.slice(babelLoaderIndex + 2),
          ];
          injectedBabelLoader = true;
        }
      } else if (typeof rule.use.loader === "string" && rule.use.loader.includes(BABEL_LOADER_STRING)) {
        rule.use = [rule.use, makeLinariaLoaderConfig(rule.use.options)];
        injectedBabelLoader = true;
      }

      crossRules(Array.isArray(rule.use) ? rule.use : [rule.use]);
    }

    if (Array.isArray(rule.oneOf)) {
      crossRules(rule.oneOf);
    }
  }
}

function withLinaria(nextConfig = {}) {
  return {
    ...nextConfig,
    webpack(config, options) {
      crossRules(config.module.rules);

      if (!injectedBabelLoader) {
        config.module.rules.push({
          test: /\.(ts?|tsx?|jsx?)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: linariaWebpackLoaderConfig.options.babelOptions,
            },
            linariaWebpackLoaderConfig,
          ],
        });
      }

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    },
  };
}
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  publicRuntimeConfig: {
    PUBLIC_API: process.env.PUBLIC_API,
    MOTO_URL: process.env.NODA_API_KEY,
    MOTO_MERCHANT_ID: process.env.MOTO_MERCHANT_ID,
    MOTO_ENV: process.env.MOTO_ENV,
    HOST: process.env.HOST,
  },
  // eslint: {
  //   // Warning: This allows production builds to successfully complete even if
  //   // your project has ESLint errors.
  //   ignoreDuringBuilds: true,
  // },
  // typescript: {
  //   // !! WARN !!
  //   // Dangerously allow production builds to successfully complete even if
  //   // your project has type errors.
  //   // !! WARN !!
  //   ignoreBuildErrors: true,
  // },
  images: {
    domains: [removeHttp(API_URL)],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: removeHttp(API_URL),
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: removeHttp(API_URL),
        pathname: '/private-img/**',
      },
    ],
  },
}

module.exports = withLinaria(nextConfig)
