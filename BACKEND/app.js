import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';  // Asegúrate de que el nombre de la exportación coincida

const app = express();

app.use(express.json());
app.use('/api', router); // Usa el router para todas las rutas de la API

mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((err) => {
  console.error('Error al conectar a MongoDB', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
