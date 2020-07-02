const OrderController = require('../controllers/OrderController');
const router = require('express').Router();

router.post('/', OrderController.create);
router.delete('/:id', OrderController.delete);
router.put('/check-out', OrderController.payOrder);
router.get('/:status', OrderController.getOrderUser);

module.exports = router;