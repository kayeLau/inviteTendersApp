import { createProcurement , updateProcurement , deleteProcurement , getProcurements } from '../models/procurement'

module.exports = class Procurement {
    getProcurements(req, res, next) {
        const userInfo = req.userInfo
        const options = { createUserId: userInfo.id , placeId: userInfo.current_placeId }
        const size = req.body.size
        const page = req.body.page


        getProcurements(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createProcurement(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            createUserId: userInfo.id,
            name: req.body.name,
            type: req.body.type,
            unit:req.body.unit,
            price:req.body.price,
            quantity:req.body.quantity,
            remark:req.body.remark,
            recordImg:req.body.recordImg
        }

        createProcurement(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateProcurement(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.id,
            name: req.body.name,
            type: req.body.type,
            unit:req.body.unit,
            price:req.body.price,
            quantity:req.body.quantity,
            remark:req.body.remark,
            recordImg:req.body.recordImg
        }


        updateProcurement(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteProcurement(req, res, next) {
        const id = req.body.createUserId

        deleteProcurement(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}