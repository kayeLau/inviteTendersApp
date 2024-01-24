var express = require('express');
var router = express.Router();

const AccountingPlaceMemderModifyMethod = require('../controllers/accounting_place_member_controller')

const accountingPlaceMemderModifyMethod = new AccountingPlaceMemderModifyMethod()

router.post('/getAccountingPlaceMemberList',accountingPlaceMemderModifyMethod.getAccountingPlaceMemberList)

router.post('/createAccountingPlaceMember',accountingPlaceMemderModifyMethod.postCreateAccountingPlaceMember)

router.post('/updatePlaceMemberInformation',accountingPlaceMemderModifyMethod.postUpdatePlaceMemberInformation)

router.post('/deletePlaceMember',accountingPlaceMemderModifyMethod.postDeletePlaceMember)


module.exports = router;
