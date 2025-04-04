import { upload } from '../files/fs';
var express = require('express');
var router = express.Router();

const { File }  = require('../files/fs')

const fileModifyMethod = new File()

router.post('/writeFile', upload.single('file'), fileModifyMethod.writeFile)

router.get('/files/:userId/:filename', fileModifyMethod.readFile)

module.exports = router;