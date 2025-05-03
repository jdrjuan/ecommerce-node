import express from 'express';
import { engine } from 'express-handlebars';

import routerProducts from './routers/products.js';
import routerSite from './routers/site.js';

import config from './config.js';

// import DB from './models/productsMongoDB.js';
// await DB.connectDB();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



const PORT = config.PORT;
const app = express();

app.use(express.static('public', { maxAge: 10000 }));

// Servir solo los archivos de Bootstrap desde node_modules
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/bootstrap-icons', express.static(__dirname + '/node_modules/bootstrap-icons/font'));

app.use(express.json()); // Requerido para recibir datos en formato JSON
app.use(express.urlencoded({ extended: true })); // Requerido para recibir datos en formato URL-encoded (formulario HTML)

app.use('/api/products', routerProducts);
app.use('/', routerSite);

// Establece el motor de plantillas handlebars, utilizando la función engine() como configuración
app.engine('hbs', engine( {
    extname: '.hbs',
    helpers: {
        // miHelper: function () { return 1000 * 2},
        // No utilizar arrows functions, ya que no tienen su propio contexto
        getFreeShippingText: function () { return this.freeShipping ? 'Sí' : 'No' },
        getStockDescription: function () {
            // "this" hace referencia al producto actual dentro del each
            if (this.stock >= 20) {
                return '(Mucho stock)';
            } else {
                return '(Poco stock)';
            }
        },
        navLinkAttrs: function (page, activePage) {
            if (page === activePage) {
                return 'class="nav-link active" aria-current="page"';
            } else {
                return 'class="nav-link"';
            }
        }
    }
}));


// Establece el motor de plantilla handlebars como el motor predeterminado para las vistas
app.set('view engine', 'hbs');

// Establece la ruta de acceso al directorio de vistas como './views'
app.set('views', './views');



const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}`));
server.on('error', error => console.log(`Se produjo un error al iniciar el servidor Express: ${error.message}`));
