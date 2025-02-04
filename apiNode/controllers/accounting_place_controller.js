const { getCurrentTime } = require('../utils')
const { getPlaceItems , createNewPlace , updatePlace , deletePlaceItem } = require('../models/accounting_place_model')

module.exports = class bid {
    getAccountingPlaceList(req, res, next) {
        const userInfo = req.userInfo
        const options = { create_user_id: userInfo.id , id:req.body.id }
        const size = req.body.size
        const page = req.body.page


        getPlaceItems(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    postCreateAccountingPlace(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            create_user_id: userInfo.id,
            place_name: req.body.place_name,
            attendance_time: req.body.attendance_time,
            attendance_unit: req.body.attendance_unit,
            state:0,
            update_time: getCurrentTime()
        }

        createNewPlace(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postUpdatePlace(req, res, next) {
        const id = req.body.id
        const data = {
            place_name: req.body.place_name,
            attendance_time: req.body.attendance_time,
            attendance_unit: req.body.attendance_unit,
            state:req.body.state,
            update_time: getCurrentTime()
        }


        updatePlace(id, data).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    postDeletePlaceItem(req, res, next) {
        const id = req.body.create_user_id

        deletePlaceItem(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}