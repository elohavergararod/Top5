import swaggerJsdoc from 'swagger-jsdoc'

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Top 5 of Everything API',
      version: '1.0.0',
      description: 'REST API for managing Top 5 lists',
    },
    servers: [
      { url: 'http://localhost:3001/api/v1', description: 'Development' },
    ],
    components: {
      schemas: {
        ListItem: {
          type: 'object',
          properties: {
            id:          { type: 'string', example: 'abc-123' },
            rank:        { type: 'integer', example: 1 },
            name:        { type: 'string', example: '2001: A Space Odyssey' },
            description: { type: 'string', example: 'Kubrick' },
          },
        },
        TopList: {
          type: 'object',
          properties: {
            id:        { type: 'string', example: 'abc-123' },
            title:     { type: 'string', example: 'Best films of all time' },
            category:  { type: 'string', enum: ['film','music','food','travel','sport','books','games','other'] },
            items:     { type: 'array', items: { $ref: '#/components/schemas/ListItem' } },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        ListInput: {
          type: 'object',
          required: ['title', 'category', 'items'],
          properties: {
            title:    { type: 'string', example: 'Best films of all time' },
            category: { type: 'string', enum: ['film','music','food','travel','sport','books','games','other'] },
            items: {
              type: 'array',
              minItems: 5,
              maxItems: 5,
              items: {
                type: 'object',
                properties: {
                  name:        { type: 'string', example: '2001: A Space Odyssey' },
                  description: { type: 'string', example: 'Kubrick' },
                },
              },
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'List not found' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
}

export const swaggerSpec = swaggerJsdoc(options)