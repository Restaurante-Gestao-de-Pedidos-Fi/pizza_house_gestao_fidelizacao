import { initDb, populateDb } from "./database/db.js";
import express from 'express';
import cors from 'cors';

// Importar rutas
import cardapioRouter from './routes/cardapio.js'; 
import clientesRouter from './routes/clientes.js';  
import mesasRouter from './routes/mesas.js';  
// import pedidosRoutes from './routes/pedidos';  
// import fidelidadeRoutes from './routes/fidelidade';  
// import historicoRoutes from './routes/historico';  

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Express com Swagger',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rotas
};

const swaggerSpec = swaggerJsdoc(options);


const app = express();

// Permite todas as solicitudes CORS 
app.use(cors());

// Rota swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware para JSON
app.use(express.json());
// Usar rutas
app.use('/api/cardapio', cardapioRouter);
app.use('/api/clientes', clientesRouter);
app.use('/api/mesas', mesasRouter);
/* app.use('/api/pedidos', pedidosRoutes);
app.use('/api/fidelidade', fidelidadeRoutes);
app.use('/api/historico', historicoRoutes); */

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando correctamente!' });
});

// Iniciar servidor
app.listen(3000,async () => {
  // Inicializar banco de dados
  console.log('Inicializando banco de dados...');
  //await initDb();
  // Inserindo dados no banco de dados
  await populateDb();

  console.log('Servidor rodando na porta 3000');
  console.log('Acesse: http://localhost:3000');
});
