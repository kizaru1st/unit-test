import express from 'express';
import { errorMiddleware } from '../middleware/error-middleware.js';
import { publicApi } from '../routes/public-api.js';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.js';

export const web = express();
web.use(express.json());
web.use(express.urlencoded({ extended: true }));

// swagger
web.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Router
web.use(publicApi)

// Error Handling
web.use(errorMiddleware)