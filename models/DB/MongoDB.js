import mongoose from 'mongoose';
import config from '../../config.js';

class MongoDB {

    static READY_STATE_DISCONNECTED = 0;
    static READY_STATE_CONNECTED = 1;
    static READY_STATE_CONNECTING = 2;
    static READY_STATE_DISCONNECTING = 3;

    static connectDB = async () => {
        if (mongoose.connection.readyState === MongoDB.READY_STATE_CONNECTED) {
            return true;
        }
        try {
            await mongoose.connect(config.MONGODB_CONNECTION_STR, {
                serverSelectionTimeoutMS: config.MONGODB_TIMEOUT,
            });
            console.log('✅ Conexión con MongoDB establecida correctamente');
            return true;
        } catch (error) {
            console.error('Error inicial al conectar con MongoDB: ', error.message || 'Error desconocido');
            return false;
        }
    };

}

export default MongoDB;
