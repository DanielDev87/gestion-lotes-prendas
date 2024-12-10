const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post('/register', [
    body('username').isString().notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('role').isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
], register
); // Ruta para registro

router.post('/login', [
        body('username').isString().notEmpty().withMessage('El nombre de usuario es obligatorio'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ],login
);       // Ruta para inicio de sesión

module.exports = router;
