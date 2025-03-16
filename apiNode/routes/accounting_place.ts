var express = require('express');
var router = express.Router();

const AccountingPlaceModifyMethod = require('../controllers/accounting_place_controller')

const accountingPlaceModifyMethod = new AccountingPlaceModifyMethod()

router.post('/getAccountingPlaceList',accountingPlaceModifyMethod.getAccountingPlaceList)

router.post('/createAccountingPlace',accountingPlaceModifyMethod.postCreateAccountingPlace)

router.post('/updatePlace',accountingPlaceModifyMethod.postUpdatePlace)

router.post('/deletePlaceItem',accountingPlaceModifyMethod.postDeletePlaceItem)


module.exports = router;
