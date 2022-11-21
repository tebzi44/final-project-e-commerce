const Product = require('../db/models/product.model')
const Log = require('../mongodb/models/log.model')

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



//ADD PRODUCT - works well +
const addProduct = async ({userId, name, price, condition, productTypeId, state, productSize})=> {

    // console.log({userId, isAdmin,name, price, condition, productTypeId, state, productSize});

    if(!name || !price || !condition || !productTypeId || !state || !productSize){

        return {message:'Not filled in all parts'}
    }

    await Product.create({
        userId,
        createdAt: new Date(),
        name,
        price,
        condition,
        productTypeId: Number(productTypeId),
        state,
        productSize,
    });

    const creationLog = new Log({
        userId,
        actionType: 'CREATED',
        dataType: 'PRODUCT'
      })
      await creationLog.save()
    
    return {message:'product added successfully'}
}







//UPDATE PRODUCT 
const updateProductById = async ({productId, userId, isAdmin, name, price, condition, productTypeId, state, productSize}) => {

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

        // const updatingProductLog = new Log({
        //     userId,
        //     isAdmin,
        //     productId,
        //     actionType: 'UPDATED',
        //     dataType: 'PRODUCT',
        //   })
        //   await updatingProductLog.save()

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

    // const updatingProductLog = new Log({
    //     userId,
    //     productId,
    //     actionType: 'UPDATED',
    //     dataType: 'PRODUCT'
    //   })
    //   await updatingProductLog.save()

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

        // const deletingProductLog = new Log({
        //     userId,
        //     isAdmin,
        //     productId,
        //     actionType: 'DELETED',
        //     dataType: 'PRODUCT'
        //   })
        // await deletingProductLog.save()

        return {message: 'product deleted by admin'}
    }

    console.log(isAdmin, userId, productId);

    await Product.update({
        deletedAt: new Date(),
        where: {
            id: productId,
            userId,
            deletedAt: null
        }
    })

    // const deletingProductLog = new Log({
    //     userId,
    //     productId,
    //     actionType: 'DELETED',
    //     dataType: 'PRODUCT'
    //   })
    //   await deletingProductLog.save()

    return {message: 'product deleted by user'}
}



module.exports = {
    getAllProducts,
    addProduct,
    updateProductById,
    deleteProductById
}