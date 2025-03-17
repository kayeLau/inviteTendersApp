import { getBids, createBid, updateBid, deleteBid, insertBidItems } from '../models/bid'

module.exports = class bid {
    getBids(req, res, next) {
        const options = { bidTitle: req.body.bidTitle }
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
            bidTitle: req.body.bidTitle,
            bidBody: req.body.bidBody,
            bidTable: req.body.bidTable,
            releaseTime: req.body.releaseTime,
            bidUnit: req.body.bidUnit,
            bidType: req.body.bidType,
            pjType: req.body.pjType,
            bidCity: req.body.bidCity,
            bidContact: req.body.bidContact,
            bidAmount: req.body.bidAmount,
            dataSource: req.body.dataSource,
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
            bidTitle: req.body.bidTitle,
            bidBody: req.body.bidBody,
            bidTable: req.body.bidTable,
            releaseTime: req.body.releaseTime,
            bidUnit: req.body.bidUnit,
            bidType: req.body.bidType,
            pjType: req.body.pjType,
            bidCity: req.body.bidCity,
            bidContact: req.body.bidContact,
            bidAmount: req.body.bidAmount,
            dataSource: req.body.dataSource,
        }


        updateBid(bidCode, data).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteBid(req, res, next) {
        const id = req.body.id

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
                bidTitle: item.bidTitle,
                bidBody: item.bidBody,
                bidTable: item.bidTable,
                releaseTime: item.releaseTime,
                bidUnit: item.bidUnit,
                bidType: item.bidType,
                pjType: item.pjType,
                bidCity: item.bidCity,
                bidContact: item.bidContact,
                bidAmount: item.bidAmount,
                dataSource: item.dataSource,
                dataHref: item.dataHref,
            }
        })
        return insertBidItems(bidList)
    }
}