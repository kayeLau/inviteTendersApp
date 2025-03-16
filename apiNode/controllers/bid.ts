import { getBids, createBid, updateBid, deleteBid, insertBidItems } from '../models/bid'

module.exports = class bid {
    getBids(req, res, next) {
        const options = { bid_title: req.body.bid_title }
        const size = req.body.size
        const page = req.body.page

        getBids(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createBid(req, res, next) {
        const data = {
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
        }

        createBid(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateBid(req, res, next) {
        const bidCode = req.body.bidCode
        const data = {
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
        }


        updateBid(bidCode, data).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteBid(req, res, next) {
        const id = req.body.bid_id

        deleteBid(id).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    insertBidItems(list) {
        let bidList = list.map(item => {
            return {
                bid_title: item.bid_title,
                bid_body: item.bid_body,
                bid_table: item.bid_table,
                release_time: item.release_time,
                bid_unit: item.bid_unit,
                bid_type: item.bid_type,
                pj_type: item.pj_type,
                bid_city: item.bid_city,
                bid_contact: item.bid_contact,
                bid_amount: item.bid_amount,
                data_source: item.data_source,
                data_href: item.data_href,
            }
        })
        return insertBidItems(bidList)
    }
}