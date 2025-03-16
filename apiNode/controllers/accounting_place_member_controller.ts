import { getPlaceMemberItems , createNewPlaceMember , updatePlaceMember , deletePlaceMemberItem } from '../models/accounting_place_member_model'

module.exports = class bid {
    getAccountingPlaceMemberList(req, res, next) {
        const userInfo = req.userInfo
        const options = { create_user_id: userInfo.create_user_id , place_id: userInfo.current_place_id }
        const size = req.body.size
        const page = req.body.page


        getPlaceMemberItems(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    postCreateAccountingPlaceMember(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            create_user_id: userInfo.create_user_id,
            user_name: req.body.user_name,
            place_id: req.body.place_id,
            user_id: req.body.user_id,
            phone_number: req.body.phone_number,
            job_type: req.body.job_type,
            salary: req.body.salary,
            gender: req.body.gender,
            id_card_number: req.body.id_card_number,
            bank: req.body.bank,
            bank_number: req.body.bank_number,
            remark: req.body.remark,
            state:0,
        }

        createNewPlaceMember(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postUpdatePlaceMember(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            create_user_id: userInfo.create_user_id,
            user_name: req.body.user_name,
            place_id: req.body.place_id,
            user_id: req.body.user_id,
            phone_number: req.body.phone_number,
            job_type: req.body.job_type,
            salary: req.body.salary,
            gender: req.body.gender,
            id_card_number: req.body.id_card_number,
            bank: req.body.bank,
            bank_number: req.body.bank_number,
            remark: req.body.remark,
            state:req.body.state,
        }


        updatePlaceMember(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    postDeletePlaceMember(req, res, next) {
        const id = req.body.create_user_id

        deletePlaceMemberItem(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}