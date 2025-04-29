var express = require('express');
var router = express.Router();

const ProcurementModifyMethod = require('../controllers/procurement')

const procurementModifyMethod = new ProcurementModifyMethod()

router.post('/getProcurements',procurementModifyMethod.getProcurements)

router.post('/createProcurement',procurementModifyMethod.createProcurement)

router.post('/updateProcurement',procurementModifyMethod.updateProcurement)

router.post('/deleteProcurement',procurementModifyMethod.deleteProcurement)

module.exports = router;
