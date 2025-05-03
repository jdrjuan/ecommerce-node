import api from '../api/products.js';

////////////////////////////////////////////////////////////////////////////////
//                               GET Controller                               //
////////////////////////////////////////////////////////////////////////////////

const getProducts = async (req, res) => {
    const products = await api.getProducts();
    if (!products) {
        return res.status(404).json({message: 'Productos no encontrados', product: []});
    }
    res.json(products);
};

const getProduct = async (req, res) => {
    const {id} = req.params;
    const product = await api.getProduct(id);
    if (!product) {
        return res.status(404).json({message: 'Producto no encontrado', product: null});
    }
    // res.json({message: 'Ok', product: product});
    res.json({message: 'Ok', product});
};

///////////////////////////////////////////////////////////////////////////////
//                              POST Controller                              //
///////////////////////////////////////////////////////////////////////////////


const postProduct = async (req, res) => {
    const product = req.body;
    const createdProduct = await api.createProduct(product);
    
    res.status(201).json({message: 'Producto dado de alta', createdProduct});
};


////////////////////////////////////////////////////////////////////////////////
//                               PUT Controller                               //
////////////////////////////////////////////////////////////////////////////////

const putProduct = async (req, res) => {
    const {id} = req.params;
    const product = req.body;

    const updatedProduct = await api.updateProduct(id, product)

    if(!updatedProduct) {
        return res.status(404).json({message: 'Producto no encontrado', product: null});
    }

    res.json({message: 'Producto actualizado', product: updatedProduct});

};


////////////////////////////////////////////////////////////////////////////////
//                              PATCH Controller                              //
////////////////////////////////////////////////////////////////////////////////

const patchProduct = async (req, res) => {
    const {id} = req.params;
    const partialProduct = req.body;

    const updatedProduct = await api.patchProduct(id, partialProduct);

    if(!updatedProduct) {
        return res.status(404).json({message: 'Producto no encontrado', product: null});
    }

    res.json({message: 'Producto actualizado', product: updatedProduct});

};


///////////////////////////////////////////////////////////////////////////////
//                             DELETE Controller                             //
///////////////////////////////////////////////////////////////////////////////

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await api.deleteProduct(id);

    if (!deletedProduct) {
        return res.status(404).json({ message: 'Producto no encontrado', product: null });
    }

    res.json({ message: 'Producto eliminado', product: deletedProduct });
};


export default {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    patchProduct,
    deleteProduct,
};
