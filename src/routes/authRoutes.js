const router = require('express').Router();
const AuthController = require('../controllers/authController');
// const SignupController = require('../controllers/signupController')





//+
router.post('/login', AuthController.login)
//+
router.post('/signup', AuthController.signup)






module.exports = router;