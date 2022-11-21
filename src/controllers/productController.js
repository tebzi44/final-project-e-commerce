const productService = require('../services/productService')


//GET-PRODUCT-controller - works well
const getProduct = async (req, res) => {
    const { isAdmin, userId } = req.user
    // console.log(userId, isAdmin);

    const data = await productService.getAllProducts({ isAdmin, userId });

    res.json(data);
}





//ADD-PRODUCT - works well +
const addProduct = async (req, res) => {
    const { userId } = req.user
    const { name, price, condition, productTypeId, state, productSize } = req.body

    const result = await productService.addProduct({userId, name, price, condition, productTypeId, state, productSize})

    res.json(result)
}



//UPDATE
const updateProduct = async (req, res) => {
    const { isAdmin, userId } = req.user
    const { name, price, condition, productTypeId, state, productSize } = req.body
    const { productId } = req.params;

    const result = await productService.updateProductById({isAdmin, productId, userId, name, price, condition, productTypeId, state, productSize });

    res.json(result)
}







//DELETE
const deleteProduct = async (req, res) => {
    const { isAdmin, userId } = req.user
    const { productId } = req.params
    
    const result = await productService.deleteProductById({ userId, productId, isAdmin })

    res.json(result)
}




module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}