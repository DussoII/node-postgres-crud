import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import { createUserTable } from './data/createUserTable.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use('/api', userRoutes);
app.use(errorHandler);

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT current_database()');
    res.json({ database: result.rows[0].current_database });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao consultar banco', error: error.message });
  }
});

async function startServer() {
  try {
    await createUserTable();
    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();