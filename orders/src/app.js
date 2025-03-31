import express from 'express';
import bodyParser from 'body-parser';
import ordersRoutes from './routes/ordersRoutes.js';
import swaggerSpec from './api-docs.js';
import swaggerUI from 'swagger-ui-express';

const app = express();

app.use(bodyParser.json());

app.use('/api/orders', ordersRoutes);
app.use('/api-docs', swaggerUI.serve,
    swaggerUI.setup(swaggerSpec));
      
export default app;