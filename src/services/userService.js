const user = require('../db/models/user.model');
const Log = require('../mongodb/models/log.model')


const getAllUsers = async ()=> {
  const data = await user.findAll({
    where: {
      deletedAt: null
    }
  })

  return data.length ? data : {message: 'User not exist'}
}




//USER ADD
const addUser = async ({ adminId, firstName, lastName, email, password, phoneNumber, isAdmin })=> {

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

  const creatingUserLog = new Log({
    userId: adminId,
    actionType: 'CREATED',
    dataType: 'USER'
  })
  await creatingUserLog.save()
  
  return {message: 'User added successfully'}
}




//USER UPDATE 
const updateUser = async ({adminId, userId, isAdmin, firstName, lastName, email, password, phoneNumber}) => {
  
  const user_ = await user.findByPk(userId)

  if(!user_){ 
    return {message: 'User not found'}
  }

  await user.update({
    isAdmin,//If admin wants to make the user admin.
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    updatedAt: new Date(),
      where: {
        id: userId
      }  
    })

    const updatinUserLog = new Log({
      userId: adminId,
      actionType: 'UPDATED',
      dataType: 'USER'
    })
    await updatinUserLog.save()

    return {message: 'User updated successfully'}
}







//USER DELETE
const deleteUser = async ({userId, adminId})=> {

  const user_ = await user.findByPk(userId)
  
  if(!user_){
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
  
  const deletingUserLog = new Log({
    userId: adminId,
    actionType: 'DELETED',
    dataType: 'USER'
  })
  await deletingUserLog.save()

  return {message: 'User deleted successfully'}
}




module.exports = {
  getAllUsers,
  addUser,
  deleteUser,
  updateUser
}