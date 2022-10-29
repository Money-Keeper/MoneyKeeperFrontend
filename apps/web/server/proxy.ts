import httpProxy from "http-proxy"

export const proxy = httpProxy.createProxyServer({
  target: process.env.API_SERVICE_URL,
  autoRewrite: false,
})
