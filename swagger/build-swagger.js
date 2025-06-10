#!/usr/bin/env node

/**
 * Genera un unico file swagger.json
 * partendo dai commenti JSDoc e dalla config di swagger-jsdoc.
 */

const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const YAML = require('yamljs'); // npm install yamljs

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoTrack API',
      version: '1.0.0',
      description: 'API per il sistema EcoTrack'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/*.js']  // punta ai file con i commenti @swagger
};

// Genera lo spec
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Percorsi di output
const jsonPath = path.resolve(__dirname, '../swagger.json');
const yamlPath = path.resolve(__dirname, '../swagger.yaml');

// Scrive swagger.json
fs.writeFileSync(jsonPath, JSON.stringify(swaggerSpec, null, 2), 'utf8');
console.log(`✅ swagger.json generato in ${jsonPath}`);

// Scrive swagger.yaml
fs.writeFileSync(yamlPath, YAML.stringify(swaggerSpec, 10), 'utf8');
console.log(`✅ swagger.yaml generato in ${yamlPath}`);
