import app from './server.js';
app.listen(app.get('port'), () => {
  console.log(`Servidor levantado en http://localhost:${app.get('port')}`);
});
