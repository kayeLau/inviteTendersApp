var express = require('express');
var router = express.Router();

const AcPlaceModifyMethod = require('../controllers/acPlace')

const acPlaceModifyMethod = new AcPlaceModifyMethod()

router.post('/getPlaces',acPlaceModifyMethod.getPlaces)

router.post('/createPlace',acPlaceModifyMethod.createPlace)

router.post('/updatePlace',acPlaceModifyMethod.updatePlace)

router.post('/deletePlace',acPlaceModifyMethod.deletePlace)


module.exports = router;
