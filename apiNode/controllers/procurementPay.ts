import { createProcurementPay, updateProcurementPay, deleteProcurementPay, getProcurementPays } from '../models/procurementPay'
import { getProcurementUnpay, updateProcurement } from '../models/procurement'


module.exports = class ProcurementPay {
    getProcurementPays(req, res, next) {
        const options = { procurementId: req.body.procurementId }
        const size = req.body.size
        const page = req.body.page

        getProcurementPays(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    async createProcurementPay(req, res, next) {
        try {
            const userInfo = req.userInfo
            const procurementId = req.body.procurementId
            const data = {
                createUserId: userInfo.id,
                type: req.body.type,
                procurementId,
                paid: req.body.paid,
                remark: req.body.remark,
                recordImg: req.body.recordImg
            }

            await createProcurementPay(data)
            const unpay = await getProcurementUnpay(procurementId)
            await updateProcurement(procurementId, { unpay }).then(result => {
                res.json(result)
            })
        } catch (err) {
            next(err)
        }
    }

    async updateProcurementPay(req, res, next) {
        try {
            const procurementId = req.body.procurementId
            const id = req.body.id
            const userInfo = req.userInfo

            const data = {
                createUserId: userInfo.id,
                type: req.body.type,
                procurementId,
                paid: req.body.paid,
                remark: req.body.remark,
                recordImg: req.body.recordImg
            }

            await updateProcurementPay(id, data)
            const unpay = await getProcurementUnpay(procurementId)
            await updateProcurement(procurementId, { unpay }).then(result => {
                res.json(result)
            })
        } catch (err) {
            next(err)
        }
    }


    async deleteProcurementPay(req, res, next) {
        const id = req.body.id
        const userId = req.userInfo.id
        const procurementId = req.body.procurementId

        try{
            await deleteProcurementPay(id, userId)
            const unpay = await getProcurementUnpay(procurementId)
            await updateProcurement(procurementId, { unpay }).then(result => {
                res.json(result)
            })
        }catch(err){
            next(err)
        }
    }
}