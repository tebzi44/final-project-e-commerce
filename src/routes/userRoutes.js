// const User = require('../db/models/user.model');
const router = require('express').Router();

const userController = require('../controllers/userController')


//+
router.get('/', userController.getUsers)
//+
router.post('/', userController.addUser)
//
router.put('/:userId', userController.updateUser)
//+
router.delete('/:userId', userController.deleteUser)




module.exports = router;
