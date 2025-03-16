var express = require('express');
var router = express.Router();

const BidModifyMethod = require('../controllers/bid_controller')

const bidModifyMethod = new BidModifyMethod()

router.post('/getBids',bidModifyMethod.getBids)

router.post('/createBid',bidModifyMethod.createBid)

router.post('/updateBid',bidModifyMethod.updateBid)

router.post('/deleteBid',bidModifyMethod.deleteBid)

module.exports = router;
