import { createProcurement, updateProcurement, deleteProcurement, getProcurements , getProcurementUnpay } from '../models/procurement'

module.exports = class Procurement {
    getProcurements(req, res, next) {
        const options = {}
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
            price: req.body.price,
            quantity: req.body.quantity,
            materialId: req.body.materialId,
            remark: req.body.remark,
            recordImg: req.body.recordImg,
            unpay: req.body.price * req.body.quantity
        }

        createProcurement(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    async updateProcurement(req, res, next) {
        try {
            const userInfo = req.userInfo
            const id = req.body.id
            const unpay = await getProcurementUnpay(id)

            const data = {
                createUserId: userInfo.id,
                name: req.body.name,
                type: req.body.type,
                price: req.body.price,
                quantity: req.body.quantity,
                materialId: req.body.materialId,
                remark: req.body.remark,
                recordImg: req.body.recordImg,
                unpay
            }
            updateProcurement(id, data).then(result => {
                res.json(result)
            })

        } catch (err) {
            next(err)
        }
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