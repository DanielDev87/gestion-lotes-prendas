const express = require('express');
const { listUsers, changeRole } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');


const router = express.Router();

router.get('/', verifyToken,listUsers);       // Listar usuarios
router.put('/role', verifyToken, isAdmin, changeRole); // Cambiar rol de usuario

module.exports = router;
