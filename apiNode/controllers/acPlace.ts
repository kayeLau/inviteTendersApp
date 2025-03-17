import { getPlaces, createPlace, updatePlace, deletePlace } from '../models/acPlace'

module.exports = class Place {
    getPlaces(req, res, next) {
        const userInfo = req.userInfo
        const options = { createUserId: userInfo.id, id: req.body.id }
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
            createUserId: userInfo.id,
            name: req.body.name,
            attendanceTime: req.body.attendanceTime,
            attendanceUnit: req.body.attendanceUnit,
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
            name: req.body.name,
            attendanceTime: req.body.attendanceTime,
            attendanceUnit: req.body.attendanceUnit,
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
        const id = req.body.createUserId

        deletePlace(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}