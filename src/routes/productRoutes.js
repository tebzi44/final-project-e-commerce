const router = require('express').Router();

const productController = require('../controllers/productController')


//+
router.get('/', productController.getProduct)
//+
router.post('/', productController.addProduct)

//+
router.put('/:productId', productController.updateProduct)
//+
router.delete('/:productId', productController.deleteProduct)




module.exports = router;
