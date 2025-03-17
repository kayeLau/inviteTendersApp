import { getAttendance , createAttendance , updateAttendance } from '../models/attendance'

module.exports = class Attendance {
    getAttendance(req, res, next) {
        const userInfo = req.userInfo
        const options = { 
            createUserId: userInfo.createUserId, 
            // placeId: req.body.placeId,
            attendanceDate:req.body.attendanceDate,
            staffId:req.body.staffId,
        }
        const size = req.body.size
        const page = req.body.page


        getAttendance(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    postCreateAttendance(req, res, next) {
        const userInfo = req.userInfo
        const staff = req.body.staff

        if(!staff.length){
            next({success:false})
        }
        
        const data = staff.map(item => {
            return [
                userInfo.current_placeId,
                userInfo.createUserId,
                item.id,
                req.body.attendanceDate,
                req.body.remark,
            ]
        })

        createAttendance(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    postUpdateAttendance(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.createUserId,
            user_name: req.body.user_name,
            placeId: req.body.placeId,
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


        updateAttendance(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}