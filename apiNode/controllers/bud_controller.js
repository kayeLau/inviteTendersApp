const { getCurrentTime } = require('../utils')
const { generateUUID } = require('../models/encryption');
const { getBudItems, createNewBud, updateBudInformation, deleteBudItem, insertBudItems } = require('../models/budManage_model')
const { verifyToken } = require('../models/verification')

module.exports = class bud {
    getBudList(req, res, next) {
        const token = req.headers['token'];
        const options = req.body.freezersNum ? { freezersNum: req.body.freezersNum } : {}
        const size = req.body.size
        const page = req.body.page

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                getBudItems(options, size, page).then(result => {
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
            bud_type: req.body.bud_type,
            pj_type: req.body.pj_type,
            bud_city: req.body.bud_city,
            bud_contact: req.body.bud_contact,
            bud_amount: req.body.bud_amount,
            data_source: req.body.data_source,
            updateDate: getCurrentTime()
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

    postUpdateBud(req, res, next) {
        const token = req.headers['token'];
        const budCode = req.body.budCode
        const budData = {
            bud_id: generateUUID(),
            bud_title: req.body.bud_title,
            bud_body: req.body.bud_body,
            bud_table: req.body.bud_table,
            release_time: req.body.release_time,
            bud_unit: req.body.bud_unit,
            bud_type: req.body.bud_type,
            pj_type: req.body.pj_type,
            bud_city: req.body.bud_city,
            bud_contact: req.body.bud_contact,
            bud_amount: req.body.bud_amount,
            data_source: req.body.data_source,
            updateDate: getCurrentTime()
        }

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                updateBudInformation(budCode, budData).then(result => {
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

    postDeleteBud(req, res, next) {
        const token = req.headers['token'];
        const id = req.body.bud_id

        verifyToken(token).then(tokenResult => {
            if (tokenResult.success === true) {
                deleteBudItem(id).then(result => {
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

    postInsertBudItems(list) {
        // const token = req.headers['token'];
        let budList = list.map(item => {
            return [
                generateUUID(),
                item.bud_title,
                item.bud_body,
                item.bud_table,
                item.release_time,
                item.bud_unit,
                item.bud_type,
                item.pj_type,
                item.bud_city,
                item.bud_contact,
                item.bud_amount,
                item.data_source,
                item.data_href,
                getCurrentTime()
            ]
        })
        return insertBudItems(budList)
    }
}