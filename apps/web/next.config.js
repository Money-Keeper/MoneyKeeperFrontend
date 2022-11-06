/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["@mk/ui", "@mk/fetcher"])

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  rewrites: () => {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_SERVICE_URL}/api/:path*`,
      },
    ]
  },
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/dashboard",
        permanent: true,
      },
    ]
  },
})

module.exports = nextConfig
