import { getSettlement, createSettlement, updateSettlement } from '../models/settlement'

module.exports = class Settlement {
    getSettlement(req, res, next) {
        const userInfo = req.userInfo
        const options = {
            createUserId: userInfo.createUserId,
        }
        const size = req.body.size
        const page = req.body.page


        getSettlement(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createSettlement(req, res, next) {
        const userInfo = req.userInfo

        const data = {
            createUserId: userInfo.id,
            placeId: req.body.placeId,
            type:req.body.type,
            salary:req.body.salary,
            staffId: req.body.staffId,
            remark: req.body.remark,
            settlementDate: req.body.settlementDate,
            workingHours: req.body.workingHours,
            costName: req.body.costName,
            cost: req.body.cost,
            recordImg: req.body.recordImg,
            mode:req.body.mode
        }

        createSettlement(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateSettlement(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.createUserId,
            placeId: req.body.placeId,
            staffId: req.body.staffId,
            remark: req.body.remark,
            settlementDate: req.body.settlementDate,
            workingHours: req.body.workingHours,
            costName: req.body.costName,
            cost: req.body.cost,
        }


        updateSettlement(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}