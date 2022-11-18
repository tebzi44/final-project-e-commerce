const router = require('express').Router();

// Custom Routes
const ProductRoutes = require('./productRoutes');
const UserRoutes = require('./userRoutes');
const product_typeRoutes = require('./product_typesRoute')

//AUTH
const AuthRoutes = require('./authRoutes');
//MIDDLEWARE
const checkAuth = require('../middleware/authMiddleware');


router.use('/auth', AuthRoutes);
// Auth Middleware
router.use(checkAuth);

router.use('/products', ProductRoutes);
// router.use('/users', UserRoutes);
// router.use('/product_types', product_typeRoutes);

module.exports = router;