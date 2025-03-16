import { getAttendance , createAttendance , updateAttendance } from '../models/attendance'

module.exports = class Attendance {
    getAttendance(req, res, next) {
        const userInfo = req.userInfo
        const options = { 
            create_user_id: userInfo.create_user_id, 
            // place_id: req.body.place_id,
            attendance_date:req.body.attendance_date,
            staff_id:req.body.staff_id,
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
                userInfo.current_place_id,
                userInfo.create_user_id,
                item.id,
                req.body.attendance_date,
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


        updateAttendance(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}