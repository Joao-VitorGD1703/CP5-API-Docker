import express from 'express';
import connectDB from './src/connections/database.js';  // Certifique-se de usar a extensão .js
import produtosRoutes from './src/routes/rotas.js';  // Certifique-se de usar a extensão .js

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use('/api', produtosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor Express em execução na porta ${PORT}`);
});

export default app;
