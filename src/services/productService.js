const Product = require('../db/models/product.model')



const getAllProducts = async ({ isAdmin, userId }) => {

    // console.log(isAdmin, userId);

    if(isAdmin === 1) {
        const data = await Product.findAll({
            attributes: ['name', 'price','condition','productTypeId','state','productSize'],
            where: {
                deletedAt: null
            }
        });
        console.log('adminshi shemovida');
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

//ADD
const addProduct = async({userId, isAdmin,name, price, condition, productTypeId, state, productSize})=> {

    console.log({userId, isAdmin,name, price, condition, productTypeId, state, productSize});

    if(!name || !price || !condition || !productTypeId || !state || !productSize){

        return {message:'Not filled in all parts'}
    }


// ერორს მიწერ productTypeId არ უნდა იყოს ნალიო!!!!!!
    const result = await Product.create({
        userId,
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


module.exports = {
    getAllProducts,
    addProduct
}