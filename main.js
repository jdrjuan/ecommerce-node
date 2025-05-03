import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routerProducts from './routers/products.js';

import config from './config.js';

const PORT = config.PORT;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json()); // Requerido para recibir datos en formato JSON

app.use('/api/products', routerProducts);

const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}`));
server.on('error', error => console.log(`Se produjo un error al iniciar el servidor Express: ${error.message}`));
