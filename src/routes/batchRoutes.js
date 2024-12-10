const express = require('express');
const { createBatch, listBatches, createGarment, simulateBatch } = require('../controllers/batchController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');


const router = express.Router();

router.post('/batches',verifyToken, isAdmin, createBatch);     // Crear lote
router.get('/batches',verifyToken, listBatches);     // Listar lotes
router.post('/garments',verifyToken, isAdmin, createGarment); // Crear prenda base
router.post('/simulate',verifyToken, simulateBatch); // Simular tiempos y costos

module.exports = router;
