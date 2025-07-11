import { getAttendance, createAttendance, updateAttendance } from '../models/attendance'

module.exports = class Attendance {
    getAttendance(req, res, next) {
        const userInfo = req.userInfo
        const options = {
            createUserId: userInfo.id,
            attendanceDate: req.body.attendanceDate,
            placeId: req.body.placeId,
            staffId: req.body.staffId,
            type: req.body.type
        }
        const size = req.body.size
        const page = req.body.page

        getAttendance(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createAttendance(req, res, next) {
        const userInfo = req.userInfo

        const data = {
            createUserId: userInfo.id,
            placeId: req.body.placeId,
            type: req.body.type,
            salary: req.body.salary,
            staffId: req.body.staffId,
            remark: req.body.remark,
            attendanceDate: req.body.attendanceDate,
            workingHours: req.body.workingHours,
            costType: req.body.costType,
            costName: req.body.costName,
            cost: req.body.cost,
            recordImg: req.body.recordImg,
            mode: req.body.mode
        }

        createAttendance(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateAttendance(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.createUserId,
            placeId: req.body.placeId,
            staffId: req.body.staffId,
            remark: req.body.remark,
            attendanceDate: req.body.attendanceDate,
            workingHours: req.body.workingHours,
            costType: req.body.costType,
            costName: req.body.costName,
            cost: req.body.cost,
        }


        updateAttendance(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}