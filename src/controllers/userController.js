const User = require('../models/User');

// Listar usuarios
exports.listUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error al listar usuarios' });
    }
};

// Cambiar rol de usuario
exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        user.role = role;
        await user.save();
        res.status(200).json({ message: 'Rol actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar rol' });
    }
};
