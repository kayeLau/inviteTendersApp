var express = require('express');
var router = express.Router();

const AcMemberModifyMethod = require('../controllers/acMember')

const acMemberModifyMethod = new AcMemberModifyMethod()

router.post('/getMembers',acMemberModifyMethod.getMembers)

router.post('/createMember',acMemberModifyMethod.createMember)

router.post('/updateMember',acMemberModifyMethod.updateMember)

router.post('/deleteMember',acMemberModifyMethod.deleteMember)

module.exports = router;
