const ProductController = require('../controllers/ProductController');
const router = require('express').Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getOneProduct);

module.exports = router;