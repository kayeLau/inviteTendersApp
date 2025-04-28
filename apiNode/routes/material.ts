var express = require('express');
var router = express.Router();

const MaterialModifyMethod = require('../controllers/material')

const materialModifyMethod = new MaterialModifyMethod()

router.post('/getMaterials',materialModifyMethod.getMaterials)

router.post('/createMaterial',materialModifyMethod.createMaterial)

router.post('/updateMaterial',materialModifyMethod.updateMaterial)

router.post('/deleteMaterial',materialModifyMethod.deleteMaterial)

module.exports = router;
