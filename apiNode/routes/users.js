var express = require('express');
var router = express.Router();

const UserModifyMethod = require('../controllers/user_controller')

const userModifyMethod = new UserModifyMethod()

router.get('/info',userModifyMethod.getUserInfo)

router.post('/login', userModifyMethod.postLogin);

router.post('/updateUserinfo', userModifyMethod.postUpdateUserinfo);

module.exports = router;
