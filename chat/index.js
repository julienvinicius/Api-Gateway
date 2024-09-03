const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = 3002;

// Definição do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Feed',
      version: '1.0.0',
      description: 'Uma API simples para serviço de feed',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: 'Servidor de desenvolvimento',
      },
    ],
  },
  apis: ['./chat/index.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * components:
 *   schemas:
 *     Mensagem:
 *       type: object
 *       properties:
 *         texto:
 *           type: string
 *           description: O conteúdo da mensagem
 *     Amigo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único do amigo
 *         nome:
 *           type: string
 *           description: Nome do amigo
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna uma mensagem de boas-vindas
 *     tags: [Geral]
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Mensagem'
 */
app.get('/', (req, res) => {
    res.json({ texto: 'Olá do serviço de feed' });
});

/**
 * @swagger
 * /friends:
 *   get:
 *     summary: Retorna a lista de amigos
 *     tags: [Amigos]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Número máximo de amigos para retornar
 *     responses:
 *       200:
 *         description: Lista de amigos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Amigo'
 */
app.get('/friends', (req, res) => {
    const amigos = [
        { id: 1, nome: 'João' },
        { id: 2, nome: 'Maria' },
    ];
    res.json(amigos);
});

app.listen(port, () => {
    console.log(`Serviço de feed rodando em http://localhost:${port}`);
    console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
});