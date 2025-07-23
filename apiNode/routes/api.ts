var express = require('express');
var router = express.Router();

const ApiModifyMethod = require('../controllers/api_controller')

const apiModifyMethod = new ApiModifyMethod()

router.post('/readApi',apiModifyMethod.readApi)

router.post('/updateApi',apiModifyMethod.updateApi)

router.post('/createApi',apiModifyMethod.createApi)



module.exports = router;