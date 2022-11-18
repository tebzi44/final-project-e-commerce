const User = require('../db/models/user.model')
const bcrypt = require('bcrypt')
const regist = async ({firstName, lastName, email, password, phoneNumber}) => {

    if(!email.includes('@') || !firstName || !lastName || password.length < 8 || phoneNumber.length < 9 ){
        
        return {message:'Not filled in correctly'}
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
    // const hashedPass = bcrypt.hash(
    //     password,
    //     process.env.saltRounds,
    //     function(err, hash) {
    //         if(err) {
    //             return console.log({Error: err});
    //         }
    //         return hash
    //     });

    await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber
        //   : hashedPass
      });
    
    return { message: 'user add'}
}



module.exports = {
    regist
}

