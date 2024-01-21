const { getCurrentTime } = require('../utils')
const { generateUUID } = require('../models/encryption');
const { getBudItems, createNewBud, updateBudInformation, deleteBudItem, insertBudItems, checkRepeated } = require('../models/bud_manage_model')

module.exports = class bud {
    getBudList(req, res, next) {
        const options = { bud_title: req.body.bud_title }
        const size = req.body.size
        const page = req.body.page


        getBudItems(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    postCreateBud(req, res, next) {
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
            update_time: getCurrentTime()
        }

        createNewBud(budData).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postUpdateBud(req, res, next) {
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
            update_time: getCurrentTime()
        }


        updateBudInformation(budCode, budData).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    postDeleteBud(req, res, next) {
        const id = req.body.bud_id

        deleteBudItem(id).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postInsertBudItems(list) {
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