var express = require('express');
var router = express.Router();

const BidModifyMethod = require('../controllers/bid_controller')

const bidModifyMethod = new BidModifyMethod()

router.post('/getBidList',bidModifyMethod.getBidList)

// router.post('/createBid',bidModifyMethod.postCreateBid)

// router.post('/updateBid',bidModifyMethod.postUpdateBid)

// router.post('/deleteBid',bidModifyMethod.postDeleteBid)


module.exports = router;
