const signupSevice = require('../services/signupService')

const signup = async (req, res) => {


    const { 
        firstName,
        lastName,
        email, 
        password,
        phoneNumber
    } = req.body;
     
    const registration = await signupSevice.regist({firstName, lastName, email, password,phoneNumber})
    

    res.send(registration)
}


module.exports = {
    signup
} 
    