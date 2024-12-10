const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Soporte para "Bearer <TOKEN>"

    if (!token) {
        return res.status(403).json({ error: 'Falta el token de autorización' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agrega el usuario decodificado al objeto `req`
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o expirado', details: error.message });
    }
};

exports.verifyRole = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ error: 'No tienes permiso para realizar esta acción' });
        }
        next();
    };
};

