const AuthService = require('../services/authService');



const login = async (req, res) => {
  const { email, password } = req.body;


  const token = await AuthService.login({ email, password });

  if (token) {
    console.log('warmatebiT gaigzavna tokeni');
    return res.status(200).json({ token });
  }


  return res.json({
    message: 'User not found, something is incorrect',
  });
};

module.exports = {
  login
};