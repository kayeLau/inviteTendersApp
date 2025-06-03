var express = require('express');
var router = express.Router();

const ProcurementPayModifyMethod = require('../controllers/procurementPay')

const procurementPayModifyMethod = new ProcurementPayModifyMethod()

router.post('/getProcurementPays',procurementPayModifyMethod.getProcurementPays)

router.post('/createProcurementPay',procurementPayModifyMethod.createProcurementPay)

router.post('/updateProcurementPay',procurementPayModifyMethod.updateProcurementPay)

router.post('/deleteProcurementPay',procurementPayModifyMethod.deleteProcurementPay)

module.exports = router;
