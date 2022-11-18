const productServices = require('../services/productService')



const getProduct = async (req, res) => {

    console.log(req.user);
    res.json({ message: 'oh shit, here we go again'})
    
}

const addProduct = async (req, res) => {

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