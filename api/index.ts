import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

import swaggerUi from 'swagger-ui-express';
import { swaggerSetup } from './docs/swagger';
import { MainRouter } from './modules';
import { config } from './config';
import { errorHandler } from './libs/errorHandler';
import { logError } from './libs/logError';

const server = express();
server.use(express.json());

// swagger


// Routes
server.use(MainRouter);
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSetup));

// middlewares
server.use(logError)
server.use(errorHandler)

server.listen(3000, () => {
    console.log('server on port', config.port);
});