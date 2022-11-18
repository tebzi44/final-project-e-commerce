const User = require("../db/models/user.model");

const deleteUser = async (userId)=> {

  const user = await User.findByPk(userId)
  
  if(!user || user.deletedAt !== null){
    const result = await User.Updata({
      deletedAt: new Date(),
    }, 
    {
      where: {
        id: userId
      }
    })
    return true
  } else {
    return false
  }
}


const update = async (userId) => {
    const user = await User.findByPk(userId)

    if(!user || user.deletedAt !== null){
        const result = await User.Updata({
          updateAt: new Date(),
        },
        {
          where: {
            id: userId
          }
        })

      return true

    } else { 
      return false
    }
}





module.exports = {
  deleteUser,
  update
}