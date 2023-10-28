var express = require('express');
var router = express.Router();

const BudModifyMethod = require('../controllers/bud_controller')

const budModifyMethod = new BudModifyMethod()

router.post('/getBudList',budModifyMethod.getBudList)

router.post('/createBud',budModifyMethod.postCreateBud)

router.post('/updateBud',budModifyMethod.postUpdateBud)

router.post('/deleteBud',budModifyMethod.postDeleteBud)


module.exports = router;
