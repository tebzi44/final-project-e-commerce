const process = require('process');//?-!
const signale = require('signale');
const { Sequelize } = require('sequelize');


// ------------- Models 
const Product_type = require('./models/product_type.model');
const Product = require('./models/product.model');
const User = require('./models/user.model');

const models = [Product_type, Product, User];

const connection = new Sequelize(
  'e-commerce',
  'postgres',
  process.env.DATABASE_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  },
);

(async () => {
  try {
    await connection.authenticate();
    signale.success('DB:Connect: Success ');
  } catch (error) {
    signale.error('DB:Connect: Error :', error);
  }
})();

models.map((m) => m.init(connection));


//1
User.hasMany(Product, {
  foreignKey: {
    name: 'userId',
    allowNull: false,
  }
});

Product.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    allowNull: false
  }
})

//2
Product_type.hasMany(Product, {
  foreignKey: {
    name: 'productTypeId',
    allowNull:false
  }
})

Product.belongsTo(Product_type, {
  foreignKey: {
    name: 'productTypeId',
    allowNull:false
  }
});


(async () => {
  await Promise.all(models.map((m) => m.sync({ force: false })));
})();

module.exports = connection;