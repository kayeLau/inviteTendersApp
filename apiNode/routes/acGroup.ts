var express = require('express');
var router = express.Router();

const AcGroupModifyMethod = require('../controllers/acGroup')

const acGroupModifyMethod = new AcGroupModifyMethod()

router.post('/getGroups',acGroupModifyMethod.getGroups)

router.post('/createGroup',acGroupModifyMethod.createGroup)

router.post('/updateGroup',acGroupModifyMethod.updateGroup)

router.post('/deleteGroup',acGroupModifyMethod.deleteGroup)

module.exports = router;
