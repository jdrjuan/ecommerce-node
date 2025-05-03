import {promises as fs} from 'fs';
import path from 'path';

class ProductModelFS {

    productsFileName = 'products.json';
    filePath = path.join(process.cwd(), 'models', this.productsFileName);
    charset = 'utf-8';

    getProductsArrayFromFile = async () => {
        let products = [];
        try {
            const fileContent = await fs.readFile(this.filePath, this.charset);
            const parsedContent = JSON.parse(fileContent);
            if (!Array.isArray(parsedContent)) {
                throw new Error('El archivo JSON no contiene un array');
            }
            products = parsedContent;
        } catch (error) {
            console.error(`Se produjo un error al leer el archivo: ${error.message}`);
        }
        return products;
    };

    saveProductsArrayToFile = async products => {
        const serializedProducts = JSON.stringify(products, null, '\t');
        try {
            await fs.writeFile(this.filePath, serializedProducts);        
        } catch (error) {
            console.error(`Se produjo un error al escribir el archivo: ${error.message}`);
            return false;
        }
        return true;
    };

    getNextId = products => {
        if (!Array.isArray(products) || products.length === 0) {
            return '1';
        }
        return (Number(products[products.length - 1].id) + 1).toString();
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////

    createProduct = async product => {
        const products = await this.getProductsArrayFromFile();

        product.id = this.getNextId(products);
        console.log(product.id);
        products.push(product);
        const writeOk = await this.saveProductsArrayToFile(products);
        if (!writeOk) {
            return null;
        }
        return product;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    getProducts = async () => {
        const products = await this.getProductsArrayFromFile();
        return products;
    };

    getProduct = async id => {
        const products = await this.getProductsArrayFromFile();
        return products.find(producto => producto.id === id);
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////

    updateProduct = async (id, product) => {
        const products = await this.getProductsArrayFromFile();
        const index = products.findIndex(producto => producto.id === id);
        if (index === -1) {
            return null;
        }
        product.id = id;
        products[index] = product;
        const writeOk = await this.saveProductsArrayToFile(products);
        if (!writeOk) {
            return null;
        }
        return product;
    };


    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    deleteProduct = async id => {
        const products = await this.getProductsArrayFromFile();
        const index = products.findIndex(producto => producto.id === id);
        if (index === -1) {
            return null;
        }
        const product = products.splice(index, 1)[0];
        const writeOk = await this.saveProductsArrayToFile(products);
        if (!writeOk) {
            return null;
        }
        return product;
    };

}

export default ProductModelFS;
