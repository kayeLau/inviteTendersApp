import { getPlaces, createPlace, updatePlace, deletePlace } from '../models/acPlace'

module.exports = class Place {
    getPlaces(req, res, next) {
        const userInfo = req.userInfo
        const options = { create_user_id: userInfo.id, id: req.body.id }
        const size = req.body.size
        const page = req.body.page


        getPlaces(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createPlace(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            create_user_id: userInfo.id,
            place_name: req.body.place_name,
            attendance_time: req.body.attendance_time,
            attendance_unit: req.body.attendance_unit,
            state: 0,
        }

        createPlace(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updatePlace(req, res, next) {
        const id = req.body.id
        const data = {
            place_name: req.body.place_name,
            attendance_time: req.body.attendance_time,
            attendance_unit: req.body.attendance_unit,
            state: req.body.state,
        }


        updatePlace(id, data).then(result => {
            console.log(result)
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deletePlace(req, res, next) {
        const id = req.body.create_user_id

        deletePlace(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}