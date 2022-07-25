const path = require('path')
const webpack = require('webpack')

const envFilePath =
  process.env.NODE_ENV === 'development' ? './.env.local' : './.env'

const { parsed: localEnv } = require('dotenv').config({
  path: envFilePath,
})

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv || {}))
    return config
  },
}
