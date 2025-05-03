import 'dotenv/config';

const config = {
    PORT:                       process.env.PORT || 3000,
    PERSISTENCE_TYPE:           process.env.PERSISTENCE_TYPE || 'MEMORY',
    MONGODB_TIMEOUT:            process.env.MONGODB_TIMEOUT || 2000,
    MONGODB_CONNECTION_STR:     process.env.MONGODB_CONNECTION_STR || 'mongodb://localhost:27017/ecommerce',
};

export default config;
