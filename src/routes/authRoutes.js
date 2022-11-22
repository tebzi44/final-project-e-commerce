const router = require('express').Router();
const AuthController = require('../controllers/authController');



//+
router.post('/login', AuthController.login)
//+
router.post('/signup', AuthController.signup)





module.exports = router;