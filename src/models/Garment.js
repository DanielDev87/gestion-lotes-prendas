const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Garment = sequelize.define('Garment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reference: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true, // URL o ruta del archivo
    },
    operations: {
        type: DataTypes.JSON,
        allowNull: false, // Listado de operaciones (array de strings)
    },
    sizes: {
        type: DataTypes.JSON,
        allowNull: false, // Ejemplo: ["S", "M", "L", "XL"]
    },
    threadPerUnit: {
        type: DataTypes.FLOAT,
        allowNull: false, // Cantidad de hilos por unidad
    },
    unitsPerMinute: {
        type: DataTypes.FLOAT,
        allowNull: false, // Tiempo de confección por unidad
    },
});

module.exports = Garment;
