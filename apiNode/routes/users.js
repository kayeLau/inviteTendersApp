var express = require('express');
var router = express.Router();

const UserModifyMethod = require('../controllers/user_controller')

const userModifyMethod = new UserModifyMethod()

router.post('/register',userModifyMethod.postRegister)

router.get('/info',userModifyMethod.getUserInfo)

router.post('/login', userModifyMethod.postLogin);

module.exports = router;
