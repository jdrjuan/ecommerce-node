import ProductModelMem from '../models/productsMem.js';
import ProductModelFS from '../models/productsFS.js';
import ProductModelMongoDB from '../models/productsMongoDB.js';

class ProductModel {
    static get (type) {
        console.log(`############ Persistencia -> ${type} ############`);
        switch (type) {
            case 'FILE SYSTEM':
                return new ProductModelFS();
            case 'MONGODB':
                return new ProductModelMongoDB();
            case 'MEMORY':
            default:
                return new ProductModelMem();
        }
    }
}

export default ProductModel;