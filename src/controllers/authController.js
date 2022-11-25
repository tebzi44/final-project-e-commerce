const AuthService = require('../services/authService');

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;


  const token = await AuthService.login({ email, password });

  if (token) {
    // console.log('token send');
    return res.status(200).json({ token });
  }

  return res.json({
    message: 'User not found, something is incorrect',
  });
};


//SIGNUP
const signup = async (req, res) => {

    const { 
        firstName,
        lastName,
        email, 
        password,
        phoneNumber
    } = req.body;
     
    const registration = await AuthService.regist({firstName, lastName, email, password,phoneNumber})
    res.send(registration)
}


module.exports = {
  login,
  signup
} 
    