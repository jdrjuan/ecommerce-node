import api from '../api/products.js';

////////////////////////////////////////////////////////////////////////////////
//                               GET Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const renderHome = async (req, res) => {
    const products = await api.getProducts() || [];

    // Renderiza la vista products y envía la respuesta al cliente
    res.render('home', {
        pageTitle: 'Productos',
        products: [...products],
        activePage: 'home',
    });
};


const renderContact = (req, res) => {
    // Renderiza la vista contact y envía la respuesta al cliente
    res.render('contact', { pageTitle: 'Contacto', activePage: 'contact' });
};


const renderProductInfo = async (req, res) => {
    const product = await api.getProduct(req.params.id);
    if(!product) {
        return res.render('error', {
            errorInfo: `No se encuentra el producto ${req.params.id}`,
            pageTitle: 'Producto no encontrado'
        });
    }

    // Renderiza la vista product-info y envía la respuesta al cliente
    res.render('product-info', {...product, pageTitle: product.name});
};


const renderProductCreate = (req, res) => {
    res.render('product-create', { pageTitle: 'Alta de productos', activePage: 'product-create', });
};


////////////////////////////////////////////////////////////////////////////////
//                              POST Controllers                              //
////////////////////////////////////////////////////////////////////////////////

const handleProductCreate = async (req, res) => {

    const { name, price, stock, brand, category, shortDescription, longDescription, freeShipping, mainPhoto } =
        req.body;

    const parsedPrice = parseFloat(price);
    const parsedStock = parseInt(stock);

    const newProduct = {
        name,
        price: parsedPrice ? parsedPrice: 0,
        stock: parsedStock ? parsedStock: 0,
        brand,
        category,
        shortDescription,
        longDescription,
        freeShipping: freeShipping === 'on',
        mainPhoto,
    };

    const createdProduct = await api.createProduct(newProduct);

    res.render('product-create', {
        pageTitle: 'Alta de productos',
        createdProduct: createdProduct,
        successMessage: 'Producto agregado con éxito.',
        activePage: 'product-create',
    });
};


export default {
    renderHome,
    renderContact,
    renderProductInfo,
    renderProductCreate,
    handleProductCreate
};
