const user = require("../db/models/user.model");



const getAllUsers = async ()=> {
  const data = await user.findAll()

  return data.length ? data : {message: 'User not exist'}
}




//USER ADD
const addUser = async ({ firstName, lastName, email, password, phoneNumber, isAdmin })=> {

  if(!firstName || !lastName || !email || !password || !phoneNumber){
    return {message:'Not filled in all parts'}
  }

  await user.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    isAdmin
  })
  return {message: 'User added successfully'}
}




//USER UPDATE
const updateUser = async ({userId, isAdmin, firstName, lastName, email, password, phoneNumber }) => {
  
  const user = await user.findByPk(userId)

  if(!user){ 
    return {message: 'User not found'}
  }

  await user.Updata({
    isAdmin,
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    deletedAt,
    updateAt: new Date(),
      where: {
        id: userId
      }  
    })

    return {message: 'User updated successfully'}
}









//USER DELETE
const deleteUser = async (userId)=> {

  const user = await user.findByPk(userId)
  
  if(!user){
    if(user.deletedAt !== null){
      return {message: 'The user has already been deleted'}
    }
    return {message: 'User not found'}
  }
  await user.update({
    deletedAt: new Date(),
    where: {
      id: userId
    }
  })

  return {message: 'User deleted successfully'}
}




module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser
}