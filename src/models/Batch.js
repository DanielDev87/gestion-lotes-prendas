const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Garment = require('./Garment');

const Batch = sequelize.define('Batch', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cantidad de unidades en el lote
    },
    unitPrice: {
        type: DataTypes.FLOAT,
        allowNull: false, // Valor por unidad
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false, // Fecha de inicio
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: true, // Fecha de entrega
    },
    totalThread: {
        type: DataTypes.FLOAT,
        allowNull: false, // Total de hilos calculados (automático)
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        defaultValue: 'pending',
    },
});

// Relación: Cada lote está asociado a una prenda específica
Batch.belongsTo(Garment, {
    foreignKey: 'garmentId',
    onDelete: 'CASCADE', // Si se elimina la prenda, también se eliminan los lotes relacionados
});

module.exports = Batch;
