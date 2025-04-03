import { upload } from '../files/fs';
var express = require('express');
var router = express.Router();

const FileModifyMethod = require('../controllers/file')

const fileModifyMethod = new FileModifyMethod()

router.post('/writeFile', upload.single('file'), fileModifyMethod.writeFile)

module.exports = router;