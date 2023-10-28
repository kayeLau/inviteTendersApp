var express = require('express');
var router = express.Router();

const UserModifyMethod = require('../controllers/user_controller')

const userModifyMethod = new UserModifyMethod()

router.post('/register',userModifyMethod.postRegister)

router.post('/login', userModifyMethod.postLogin);

router.post('/update', userModifyMethod.postUpdateUser);

router.post('/getUsersList', userModifyMethod.getUsersList);

module.exports = router;
