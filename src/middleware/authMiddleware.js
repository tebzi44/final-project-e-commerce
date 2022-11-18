const jwt = require('jsonwebtoken');


const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const { userId, isAdmin } = jwt.verify(
      token,
      'secretKey123',);

    req.user = {
      userId,
      isAdmin
    };

    return next();
    
  } catch (e) {


    console.log(e);
    return res.status(401).json({ message: 'UNAUTHORIZED' });
  }
};



module.exports = checkAuth;








// try {
//   const token = req.headers.authorization.split(' ')[1];
  
//   const { userId } = jwt.verify(
//     token,
//     'secretKey',)

//     req.user = { userId }

  
//     return next()
//   } catch (error) {

//     return res.json({ message: 'Unauthorized'})
//   }
// };