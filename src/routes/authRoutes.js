const express = require('express');
const { register, login } = require('../controllers/authController');
const { body } = require('express-validator');

const router = express.Router();

router.post(
    '/register',
    [
        body('name').isString().notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('Debe proporcionar un correo válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('role').optional().isIn(['admin', 'user']).withMessage('El rol debe ser "admin" o "user"'),
    ],
    register
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Debe proporcionar un correo válido'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria'),
    ],
    login
);      

module.exports = router;
