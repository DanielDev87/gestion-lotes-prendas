const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { isAdmin } = require('../middlewares/roleMiddleware');



const router = express.Router();

router.get('/', verifyToken,isAdmin, userController.getAllUsers); 
router.post('/', verifyToken, isAdmin, userController.createUser)    
router.put('/role', verifyToken, isAdmin, userController.changeUserRole); 
router.delete('/:userId', verifyToken, isAdmin, userController.deleteUser)

module.exports = router;
