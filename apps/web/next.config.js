/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@mk/ui", "@mk/fetcher"])

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
})

module.exports = nextConfig
