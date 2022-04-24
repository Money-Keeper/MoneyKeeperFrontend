const cors = require('cors');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');

const app = express();

const PORT = 3001;
const HOST = 'localhost';
const API_SERVICE_URL = 'http://localhost:5282';

app.use(cors());

app.use(morgan('dev'));

app.use(
  '/api',
  createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
  })
);

app.listen(PORT, HOST, () => {
  // eslint-disable-next-line no-console
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
