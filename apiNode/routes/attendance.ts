var express = require('express');
var router = express.Router();

const AttendanceMOdifyMethod = require('../controllers/attendance_controller')

const attendanceMOdifyMethod = new AttendanceMOdifyMethod()

router.post('/getAddendce',attendanceMOdifyMethod.getAttendance)

router.post('/createAddendce',attendanceMOdifyMethod.postCreateAttendance)

router.post('/updateAddendce',attendanceMOdifyMethod.postUpdateAttendance)


module.exports = router;
