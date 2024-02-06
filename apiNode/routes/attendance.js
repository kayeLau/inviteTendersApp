var express = require('express');
var router = express.Router();

const attendanceMOdifyMethod = require('../controllers/attendance_controller')

const accountingPlaceModifyMethod = new attendanceMOdifyMethod()

router.post('/getAddendce',accountingPlaceModifyMethod.getAttendance)

router.post('/createAddendce',accountingPlaceModifyMethod.postCreateAttendance)

router.post('/updateAddendce',accountingPlaceModifyMethod.postUpdateAttendance)


module.exports = router;
