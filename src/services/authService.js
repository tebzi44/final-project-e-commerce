const User = require('../db/models/user.model');
const jwt = require('jsonwebtoken');




const login = async ({
  email, password
}) => {
  
  const user = await User.findOne({
    where: {
      email,
      password
    }
  });

  // console.log(user);

  if (user) {
    const token = jwt.sign({
          userId: user.id,
          isAdmin: user.isAdmin
        },
        'secretKey123',
        {
          expiresIn: '5h'
        }
      );

    return token;
  }

  return false;
};


module.exports = {
  login,
};
















