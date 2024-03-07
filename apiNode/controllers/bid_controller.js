const { getCurrentTime } = require('../utils')
const { generateUUID } = require('../models/encryption');
const { getBidItems, createNewBid, updateBid, deleteBidItem, insertBidItems, checkRepeated } = require('../models/bid_manage_model')

module.exports = class bid {
    getBidList(req, res, next) {
        const options = { bid_title: req.body.bid_title }
        const size = req.body.size
        const page = req.body.page


        getBidItems(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    postCreateBid(req, res, next) {
        const bidData = {
            bid_id: generateUUID(),
            bid_title: req.body.bid_title,
            bid_body: req.body.bid_body,
            bid_table: req.body.bid_table,
            release_time: req.body.release_time,
            bid_unit: req.body.bid_unit,
            bid_type: req.body.bid_type,
            pj_type: req.body.pj_type,
            bid_city: req.body.bid_city,
            bid_contact: req.body.bid_contact,
            bid_amount: req.body.bid_amount,
            data_source: req.body.data_source,
            update_time: getCurrentTime()
        }

        createNewBid(bidData).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postUpdateBid(req, res, next) {
        const bidCode = req.body.bidCode
        const bidData = {
            bid_id: generateUUID(),
            bid_title: req.body.bid_title,
            bid_body: req.body.bid_body,
            bid_table: req.body.bid_table,
            release_time: req.body.release_time,
            bid_unit: req.body.bid_unit,
            bid_type: req.body.bid_type,
            pj_type: req.body.pj_type,
            bid_city: req.body.bid_city,
            bid_contact: req.body.bid_contact,
            bid_amount: req.body.bid_amount,
            data_source: req.body.data_source,
            update_time: getCurrentTime()
        }


        updateBid(bidCode, bidData).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    postDeleteBid(req, res, next) {
        const id = req.body.bid_id

        deleteBidItem(id).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postInsertBidItems(list) {
        let bidList = list.map(item => {
            return [
                generateUUID(),
                item.bid_title,
                item.bid_body,
                item.bid_table,
                item.release_time,
                item.bid_unit,
                item.bid_type,
                item.pj_type,
                item.bid_city,
                item.bid_contact,
                item.bid_amount,
                item.data_source,
                item.data_href,
                getCurrentTime()
            ]
        })
        return insertBidItems(bidList)
    }
}