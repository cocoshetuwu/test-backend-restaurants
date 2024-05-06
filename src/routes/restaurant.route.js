const {Router} = require('express');
const router = Router();
const controller = require('../controllers/restaurant.controller');

router.get('/', controller.getRestaurants);
router.get('/statistics', controller.getStatistics);
router.get('/:id', controller.getRestaurantById);
router.post('/', controller.createRestaurant);
router.patch('/:id', controller.updateRestaurant);
router.delete('/:id', controller.deleteRestaurant);

module.exports = router;