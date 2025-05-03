import express from 'express';
import siteController from '../controllers/site.js';

const routerSite = express.Router();

routerSite.get('/', siteController.renderHome);

routerSite.get('/contact', siteController.renderContact);

routerSite.get('/product-info/:id', siteController.renderProductInfo);

routerSite.get('/product-create', siteController.renderProductCreate);

routerSite.post('/product-create', siteController.handleProductCreate);

// module.exports = routerSite;
export default routerSite;
