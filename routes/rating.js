const express = require('express');
const router = express.Router();
const ratingController = require('../controller/ratingController');
const auth = require('../middleware/jwtMiddleware');

router.get('/user/:userId', ratingController.getRatings);

router.get('/:id/', ratingController.getOneRating);

router.post('/user/:userId/investigation/:investigationId', auth, ratingController.insertOneRating);

router.delete('/:id', auth, ratingController.deleteOneRating);

module.exports = router;
