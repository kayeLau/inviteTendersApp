import { createMember , updateMember , deleteMember , getMembers } from '../models/acMember'

module.exports = class bid {
    getMembers(req, res, next) {
        const userInfo = req.userInfo
        const options = { createUserId: userInfo.id , placeId: userInfo.current_placeId }
        const size = req.body.size
        const page = req.body.page


        getMembers(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createMember(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            createUserId: userInfo.id,
            name: req.body.name,
            placeId: req.body.placeId,
            phoneNumber: req.body.phoneNumber,
            jobType: req.body.jobType,
            salary: req.body.salary,
            gender: req.body.gender,
            idCardNumber: req.body.idCardNumber,
            bank: req.body.bank,
            bankNumber: req.body.bankNumber,
            remark: req.body.remark,
            state:0,
        }

        createMember(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateMember(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.createUserId,
            name: req.body.name,
            placeId: req.body.placeId,
            phoneNumber: req.body.phoneNumber,
            jobType: req.body.jobType,
            salary: req.body.salary,
            gender: req.body.gender,
            idCardNumber: req.body.idCardNumber,
            bank: req.body.bank,
            bankNumber: req.body.bankNumber,
            remark: req.body.remark,
            state:req.body.state,
        }


        updateMember(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteMember(req, res, next) {
        const id = req.body.createUserId

        deleteMember(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}