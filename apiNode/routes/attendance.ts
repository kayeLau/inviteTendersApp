var express = require('express');
var router = express.Router();

const AttendanceMOdifyMethod = require('../controllers/attendance')

const attendanceMOdifyMethod = new AttendanceMOdifyMethod()

router.post('/getAddendce',attendanceMOdifyMethod.getAttendance)

router.post('/createAddendce',attendanceMOdifyMethod.createAttendance)

router.post('/updateAddendce',attendanceMOdifyMethod.updateAttendance)


module.exports = router;
