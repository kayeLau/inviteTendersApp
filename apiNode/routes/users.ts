var express = require('express');
var router = express.Router();

const UserModifyMethod = require('../controllers/user')

const userModifyMethod = new UserModifyMethod()

router.get('/getUserInfo',userModifyMethod.getUserInfo)

router.post('/login', userModifyMethod.login);

router.post('/updateUserinfo', userModifyMethod.updateUserinfo);

module.exports = router;
