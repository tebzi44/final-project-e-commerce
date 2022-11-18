const productService = require('../services/productService')



const getProduct = async (req, res) => {
    const { isAdmin, userId } = req.user
    // console.log(userId, isAdmin);

    const data = await productService.getAllProducts({ isAdmin, userId });
    return res.json({ data });


    // res.json({ message: 'back response'})



    // const result = await Product.findAll({
    //   attributes: ['title', 'price'],
    //  where: {

    //     deletedAt: null
    //   }
    // });
  
    // return res.json({ data: result });
}






const addProduct = async (req, res) => {
    const {userId, isAdmin} = req.user
    const { name, price, condition, productTypeId, state, productSize } = req.body

    // console.log(userId, isAdmin, req.body);

    const result = await productService.addProduct({userId, isAdmin,name, price, condition, productTypeId, state, productSize})

    res.json(result)
}

const updateProduct = async (req, res) => {
    
}

const deleteProduct = async (req, res) => {
    
}




module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}