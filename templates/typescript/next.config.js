const path = require("path");
const webpack = require("webpack");

const envFilePath =
  process.env.NODE_ENV === "development" ? "./.env.local" : "./.env";

const { parsed: localEnv } = require("dotenv").config({
  path: envFilePath,
});

const {
  NEXT_PUBLIC_CDA_ACCESS_TOKEN,
  NEXT_PUBLIC_CPA_ACCESS_TOKEN,
  NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
  NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
} = process.env;

module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    CTF_CDA_ACCESS_TOKEN: NEXT_PUBLIC_CDA_ACCESS_TOKEN,
    CTF_CPA_ACCESS_TOKEN: NEXT_PUBLIC_CPA_ACCESS_TOKEN,
    CTF_ENV: NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    CTF_SPACE_ID: NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["images.ctfassets.net"],
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv || {}));
    return config;
  },
};
