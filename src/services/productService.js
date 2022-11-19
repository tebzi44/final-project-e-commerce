const Product = require('../db/models/product.model')


// GET ALL PRODUCT +
const getAllProducts = async ({ isAdmin, userId }) => {

    if(isAdmin === 1) {
        const data = await Product.findAll({
            attributes: ['name', 'price','condition','productTypeId','state','productSize'],
            where: {
                deletedAt: null
            }
        });
        return data
    }
    
        const data = await Product.findAll({
            attributes: ['name', 'price','condition','productTypeId','state','productSize'],
            where: {
                userId: Number(userId),
                deletedAt: null
            }
        });

        return (!data.length ? {message:'data is empty'} : data);
}



//ADD PRODUCT
const addProduct = async({userId, isAdmin,name, price, condition, productTypeId, state, productSize})=> {

    // console.log({userId, isAdmin,name, price, condition, productTypeId, state, productSize});

    if(!name || !price || !condition || !productTypeId || !state || !productSize){

        return {message:'Not filled in all parts'}
    }


// ერორს მიწერ productTypeId არ უნდა იყოს ნალიო!!
    await Product.create({
        userId: 12,
        createdAt: new Date(),
        name,
        price,
        condition,
        productTypeId: Number(productTypeId),
        state,
        productSize,
    });
    
    return {message:'product added successfully'}
    
}


//UPDATE PRODUCT
const updateProductById = async ({productId, userId, name, price, condition, productTypeId, state, productSize}) => {

    if(isAdmin === 1) {
        await Product.update({
        name,
        price,
        condition,
        productTypeId,
        state,
        productSize,
        updatedAt: new Date(),
            where: {
                id: productId,
                deletedAt: null
            }
        })
        return {message: 'product updated by admin'}
    }

    await Product.update({
        name,
        price,
        condition,
        productTypeId,
        state,
        productSize,
        updatedAt: new Date(),
        where: {
            id: productId,
            userId,
            deletedAt: null
        }
    })
    return {message: 'product updated'}
}


//DELETE PRODUCT
const deleteProductById = async ({isAdmin, userId, productId})=> {

    if(isAdmin === 1) {
        await Product.update({
            deletedAt: new Date(),
            where: {
                id: productId,
                deletedAt: null
            }
        })
        return {message: 'product deleted by admin'}
    }

    await Product.update({
        deleteAt: new Date(),
        where: {
            id: productId,
            userId,
            deletedAt: null
        }
    })
    return {message: 'product deleted by user'}
}





module.exports = {
    getAllProducts,
    addProduct,
    updateProductById,
    deleteProductById
}