import { createProcurementPay , updateProcurementPay , deleteProcurementPay , getProcurementPays } from '../models/procurementPay'

module.exports = class ProcurementPay {
    getProcurementPays(req, res, next) {
        const userInfo = req.userInfo
        const options = { createUserId: userInfo.id , placeId: userInfo.current_placeId }
        const size = req.body.size
        const page = req.body.page


        getProcurementPays(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createProcurementPay(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            createUserId: userInfo.id,
            type: req.body.type,
            procurementId:req.body.procurementId,
            paid:req.body.paid,
            remark:req.body.remark,
            recordImg:req.body.recordImg
        }
        console.log(data)

        createProcurementPay(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateProcurementPay(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.id,
            type: req.body.type,
            procurementId:req.body.procurementId,
            paid:req.body.paid,
            remark:req.body.remark,
            recordImg:req.body.recordImg
        }


        updateProcurementPay(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteProcurementPay(req, res, next) {
        const id = req.body.createUserId

        deleteProcurementPay(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}