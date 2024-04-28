//importo express
import express from 'express';
//importo dotenv para usar el archivo .env
import dotenv from 'dotenv';
//importo las rutas
import routerUser from './routers/user.routes.js';
import routerProfile from './routers/profile.routes.js';
import routerServices from './routers/services.routes.js';
//crea una instancia de express - Inicializaciones
const app = express();
dotenv.config();
console.log(process.env.PORT);
app.set('port', process.env.PORT || 3000);
//Middlewares
app.use(express.json());
//Rutas
//ruta inicial
app.get('/', (req, res) => {
  res.send('Servidor on-line');
});
app.use('/api', routerUser);
app.use('/api', routerProfile);
app.use('/api', routerServices);
//ruta no encontrada
app.use((req, res) => {
  res.status(404).send('EndPoint no encontrado');
});
//exportacion por defecto
export default app;
