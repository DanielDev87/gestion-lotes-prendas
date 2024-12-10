const app = require('./app');
const dotenv = require('dotenv');
const sequelize = require('../config/db'); 
const Garment = require('./models/Garment'); 
const Batch = require('./models/Batch'); 


dotenv.config();

const PORT = process.env.PORT || 4000;

// Sincronizar modelos y luego iniciar el servidor
const initializeServer = async () => {
    try {
        await sequelize.authenticate(); // Verifica la conexión con la base de datos
        console.log('Conexión con la base de datos establecida.');

        await sequelize.sync({ force: false }); // Cambia a `true` para recrear tablas en desarrollo
        console.log('Modelos sincronizados con la base de datos.');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al inicializar el servidor:', error);
    }
};

initializeServer();
