const userService = require('../services/userService')



const getUsers = async (req, res)=> {
    const data = await userService.getAllUsers()  
    res.json(data)
}


//ADD USER
const addUser = async (req, res)=>{
    const adminId = req.user.userId
    const { firstName, lastName, email, password, phoneNumber, isAdmin } = req.body
    const result = await userService.addUser({ adminId, firstName, lastName, email, password, phoneNumber, isAdmin })
    res.json(result)
}


//USER UPDATE 
const updateUser = async (req, res) => {
    try{
        const adminId  = req.user.userId
        const { userId } = req.params
        const { isAdmin, firstName, lastName, email, password, phoneNumber } = req.body
        
        const updateUser = await userService.updateUser({adminId, userId, isAdmin, firstName, lastName, email, password, phoneNumber})
        res.json(updateUser)
    } catch (e) {
        // console.log(e);
        return res.status(500).json({
            message: 'SERVER ERROR'
          });
    }
}


//USER DELETE 
const deleteUser = async (req, res)=> {
    try {
        const { userId } = req.params
        const adminId = req.user.userId
        
        const deleteUser = await userService.deleteUser({userId, adminId})
        res.json(deleteUser)
    } catch (e) {
        // console.log(e);
        return res.status(500).json({
            message: 'SERVER ERROR'
          });
    }
}



module.exports = {
    getUsers,
    addUser,
    updateUser,
    deleteUser
} 