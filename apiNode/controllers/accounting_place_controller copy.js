const { getCurrentTime } = require('../utils')
const { getPlaceItems , createNewPlace , updatePlaceInformation , deletePlaceItem } = require('../models/accounting_place_model')

module.exports = class bud {
    getAccountingPlaceList(req, res, next) {
        const options = { create_user_id: req.body.create_user_id }
        const size = req.body.size
        const page = req.body.page


        getPlaceItems(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    postCreateAccountingPlace(req, res, next) {
        const data = {
            create_user_id: req.body.create_user_id,
            place: req.body.place,
            attendance_time: req.body.attendance_time,
            attendance_unit: req.body.attendance_unit,
            updateDate: getCurrentTime()
        }

        createNewPlace(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postUpdatePlaceInformation(req, res, next) {
        const budCode = req.body.budCode
        const budData = {
            place: req.body.place,
            attendance_time: req.body.attendance_time,
            attendance_unit: req.body.attendance_unit,
            updateDate: getCurrentTime()
        }


        updatePlaceInformation(budCode, budData).then(result => {
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