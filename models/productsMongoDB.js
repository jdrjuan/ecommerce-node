import mongoose from 'mongoose';
import MongoDB from './DB/MongoDB.js';

const productsSchema = new mongoose.Schema({
    "name": String,
    "price": Number,
    "stock": Number,
    "brand": String,
    "category": String,
    "shortDescription": String,
    "longDescription": String,
    "freeShipping": Boolean,
    "mainPhoto": String
});

const Product = mongoose.model('Product', productsSchema);

////////////////////////////////////////////////////////////////////////////////
//                              CRUD - C: Create                              //
////////////////////////////////////////////////////////////////////////////////

class ProductModelMongoDB {

    createProduct = async product => {
        if (! await MongoDB.connectDB()) {
            return null;
        }
        try {
            const newProduct = new Product(product);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            console.error('Error al crear el producto: ', error.message || 'Error desconocido');
            return null;
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    getProducts = async () => {
        if (! await MongoDB.connectDB()) {
            return null;
        }
        try {
            const foundProducts = await Product.find();
            return foundProducts;
        } catch (error) {
            console.error('Error al obtener los productos: ', error.message || 'Error desconocido');
            return null;
        }
    };

    getProduct = async id => {
        if (! await MongoDB.connectDB()) {
            return null;
        }
        try {
            const foundProduct = await Product.findById(id);
            return foundProduct;
        } catch (error) {
            console.error('Error al obtener el producto: ', error.message || 'Error desconocido');
            return null;
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////

    updateProduct = async (id, product) => {
        if (! await MongoDB.connectDB()) {
            return null;
        }
        try {
            const updatedProduct = await Product.findByIdAndUpdate(id, { $set: product }, {
                returnDocument: 'after'
            });
            return updatedProduct;
        } catch (error) {
            console.error('Error al actualizar el producto: ', error.message || 'Error desconocido');
            return null;
        }
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    deleteProduct = async id => {
        if (! await MongoDB.connectDB()) {
            return null;
        }
        try {
            const deletedProduct = await Product.findByIdAndDelete(id);
            return deletedProduct;
        } catch (error) {
            console.error('Error al eliminar el producto: ', error.message || 'Error desconocido');
            return null;
        }
    };

}

export default ProductModelMongoDB;
