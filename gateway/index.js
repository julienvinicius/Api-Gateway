const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 3000;

// Configuração do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Gateway',
      version: '1.0.0',
      description: 'Documentação da API Gateway',
    },
    servers: [
      {
        url: `http://127.0.0.1:${port}`,
      },
    ],
  },
  apis: ['./gateway/index.js'], // caminho para os arquivos com anotações JSDoc
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /chat-service/{path}:
 *   get:
 *     summary: Proxy para o serviço de chat
 *     parameters:
 *       - in: path
 *         name: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.use('/chat-service', createProxyMiddleware({
  target: 'http://127.0.0.1:3001',
  pathRewrite: {
    '^/chat-service': '',
  }
}));

/**
 * @swagger
 * /feed-service/{path}:
 *   get:
 *     summary: Proxy para o serviço de feed
 *     parameters:
 *       - in: path
 *         name: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sucesso
 */
app.use('/feed-service', createProxyMiddleware({
  target: 'http://127.0.0.1:3002',
  pathRewrite: {
    '^/feed-service': '',
  }
}));

app.listen(port, () => {
  console.log(`API Gateway service listen at http://127.0.0.1:${port}`);
  console.log(`Swagger documentation available at http://127.0.0.1:${port}/api-docs`);
});