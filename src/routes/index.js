const router = require('express').Router();

// Custom Routes
const ProductRoutes = require('./productRoutes');
const UserRoutes = require('./userRoutes');
// const product_typeRoutes = require('./product_typesRoute')

//AUTH
const AuthRoutes = require('./authRoutes');
//MIDDLEWARE
const checkAuth = require('../middleware/authMiddleware');
const onlyAdmin = require('../middleware/onlyAdmin')


router.use('/auth', AuthRoutes);

// Auth Middleware
router.use(checkAuth);

router.use('/products', ProductRoutes);

// check Admin Middleware
router.use(onlyAdmin)

router.use('/users', UserRoutes);





module.exports = router;