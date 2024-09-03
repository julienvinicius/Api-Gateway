const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();

// Definição das opções do Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API do Meu Projeto',
      version: '1.0.0',
      description: 'Documentação da API do meu projeto',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos com as rotas
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Rota para a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ... resto do seu código ...