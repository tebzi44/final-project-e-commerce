const User = require('../db/models/user.model')
const jwt = require('jsonwebtoken')
const Log = require('../mongodb/models/log.model')

const process = require('process')
const bcrypt = require('bcrypt')



const login = async ({
  email, password
}) => {
  
  const user = await User.findOne({
    where: {
      email,
      password
    }
  });

  if (user) {
    const token = jwt.sign({
          userId: user.id,
          isAdmin: user.isAdmin
        },
        process.env.SECRET,
        {
          expiresIn: '5h'
        }
      );

    return token;
  }
  return false;
};



//SIGNUP
const regist = async ({firstName, lastName, email, password, phoneNumber}) => {

  if(!email.includes('@') || !firstName || !lastName || password.length < 8 || phoneNumber.length < 9 ){
    return {message:'Not filled in correctly'}  
  }

  if(!/^[0-9,+]+$/.test(phoneNumber)){
    return ({message: 'phoneNumber must be only number'})
  }

  const checkEmail = await User.findOne({
      where: {
          email
      }
  })
  const checkPhoneNumber = await User.findOne({
      where: {
          phoneNumber
       }
  })
    
  if(checkEmail || checkPhoneNumber){
      return { message:'user already exists'}
  }
  
  try {
    const hash = bcrypt.hashSync(password, Number(process.env.SALT_AMOUNT));
  
  await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      phoneNumber
    });

    const creationLog = new Log({
      actionType: 'CREATED',
      dataType: 'USER'
    });

    await creationLog.save()

  return { message: 'user add'}

} catch (e) {
  // console.log(e);
  return { message: 'INTERNAL_SERVER_ERROR' };
}
}





module.exports = {
  login,
  regist
};
















