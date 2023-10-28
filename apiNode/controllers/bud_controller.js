const { getCurrentTime } = require('../utils')
const { generateUUID } = require('../models/encryption');
const { getBudItems , createNewBud , updateBudInformation , deleteBudItem } = require('../models/budManage_model')
const { verifyToken } = require('../models/verification')

module.exports = class bud {
    getBudList(req, res, next){
        const token = req.headers['token'];
        const options = req.body.freezersNum ? { freezersNum: req.body.freezersNum } : {}
        const size = req.body.size
        const page = req.body.page

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                getBudItems(options,size,page).then(result => {
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
            } else {
                res.json(tokenResult)
            }
        })
    }

    postCreateBud(req, res, next) {
        const token = req.headers['token'];
        const budData = {
            bud_id: generateUUID(),
            bud_title: req.body.bud_title,
            bud_body: req.body.bud_body,
            bud_table: req.body.bud_table,
            release_time: req.body.release_time,
            bud_unit: req.body.bud_unit,
            bud_type:req.body.bud_type,
            pj_type:req.body.pj_type,
            bud_city:req.body.bud_city,
            bud_contact:req.body.bud_contact,
            bud_amount:req.body.bud_amount,
            data_source:req.body.data_source,
            updateDate:getCurrentTime()
        }

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                createNewBud(budData).then(result => {
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
            } else {
                res.json(tokenResult)
            }
        })
    }

    postUpdateBud(req, res, next){
        const token = req.headers['token'];
        const budCode = req.body.budCode
        const budData = {
            bud_id: generateUUID(),
            bud_title: req.body.bud_title,
            bud_body: req.body.bud_body,
            bud_table: req.body.bud_table,
            release_time: req.body.release_time,
            bud_unit: req.body.bud_unit,
            bud_type:req.body.bud_type,
            pj_type:req.body.pj_type,
            bud_city:req.body.bud_city,
            bud_contact:req.body.bud_contact,
            bud_amount:req.body.bud_amount,
            data_source:req.body.data_source,
            updateDate:getCurrentTime()
        }

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                updateBudInformation(budCode,budData).then(result => {
                    console.log(result)
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
            } else {
                res.json(tokenResult)
            }
        })
    }

    postDeleteBud(req, res, next){
        const token = req.headers['token'];
        const budCode = req.body.budCode

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                deleteBudItem(budCode).then(result => {
                    console.log(result)
                    res.json(result)
                }).catch(err => {
                    res.json(err)
                })
            } else {
                res.json(tokenResult)
            }
        })
    }
}