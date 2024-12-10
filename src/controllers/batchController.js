const Batch = require('../models/Batch');
const Garment = require('../models/Garment');

// Crear lote
exports.createBatch = async (req, res) => {
    try {
        const { name, garments, startDate, endDate, unitPrice, units } = req.body;
        const batch = await Batch.create({ name, garments, startDate, endDate, unitPrice, units });
        res.status(201).json({ message: 'Lote creado exitosamente', batch });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear lote' });
    }
};

// Listar lotes
exports.listBatches = async (req, res) => {
    try {
        const batches = await Batch.findAll();
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar lotes' });
    }
};

// Crear prenda base
exports.createGarment = async (req, res) => {
    try {
        const { name, reference, operations, sizes, threadsPerUnit, unitsPerMinute, image } = req.body;
        const garment = await Garment.create({ name, reference, operations, sizes, threadsPerUnit, unitsPerMinute, image });
        res.status(201).json({ message: 'Prenda creada exitosamente', garment });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear prenda' });
    }
};

// Simular tiempos y costos
exports.simulateBatch = async (req, res) => {
    try {
        const { units, unitTime } = req.body; // Suponiendo que enviamos tiempo por unidad
        const totalTime = units * unitTime; // Total de tiempo en minutos
        res.status(200).json({ totalTime, hours: (totalTime / 60).toFixed(2) });
    } catch (error) {
        res.status(500).json({ error: 'Error al simular lote' });
    }
};
