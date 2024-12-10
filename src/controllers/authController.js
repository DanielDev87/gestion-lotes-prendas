const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importa el modelo de usuarios
const { validationResult } = require('express-validator');

// Registro
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password, role } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ error: 'El nombre de usuario ya está en uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, role });

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: { id: user.id, username: user.username, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar usuario', details: error.message });
    }
};

// Inicio de sesión
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { username, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        // Generar token
        const token = jwt.sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: { id: user.id, username: user.username, role: user.role },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
};
