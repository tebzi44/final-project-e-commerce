const productService = require('../services/productService')


//GET-PRODUCT 
const getProduct = async (req, res) => {
    const { isAdmin, userId } = req.user
    const data = await productService.getAllProducts({ isAdmin, userId });
    res.json(data);
}



//ADD-PRODUCT
const addProduct = async (req, res) => {
    const { userId } = req.user
    const { name, price, condition, productTypeId, state, productSize } = req.body
    const result = await productService.addProduct({userId, name, price, condition, productTypeId, state, productSize})
    res.json(result)
}



//UPDATE-PRODUCT
const updateProduct = async (req, res) => {
    try {
        const { isAdmin, userId } = req.user
        const { name, price, condition, productTypeId, state, productSize } = req.body
        const { productId } = req.params;
        
        const result = await productService.updateProductById({isAdmin, productId, userId, name, price, condition, productTypeId, state, productSize });
        
        res.json(result)
    } catch (e) {
        // console.log(e);
        return res.status(500).json({
            message: 'SERVER ERROR'
          });
    }
}




//DELETE-PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const { isAdmin, userId } = req.user
        const { productId } = req.params
        const result = await productService.deleteProductById({ userId, productId, isAdmin })
        
        res.json(result)
    } catch (e) {
        // console.log(e);
        return res.status(500).json({
            message: 'SERVER ERROR'
          });
    }
}



module.exports = {
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}