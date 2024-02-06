const { updateItem, getItems, customQuery } = require('./base_model')

function createAttendance(data) {
    return customQuery(`INSERT IGNORE INTO attendance_info (
        place_id,
        create_user_id,
        staff_id,
        attendance_date,
        remark,
        update_time) VALUES ? `, [data])
}

function updateAttendance(id, data) {
    return updateItem("attendance_info", data, 'id', id)
}

function getAttendance(options, size, page) {
    return getItems({
        table: 'attendance_info',
        columns: `* , DATE_FORMAT(attendance_info.update_time,'%Y-%m-%d %H:%i:%S') AS update_time, DATE_FORMAT(attendance_info.attendance_date,'%Y-%m-%d') AS attendance_date`,
        options,
        size,
        page,
        join: 'attendance_info join place_member_info ON attendance_info.staff_id=place_member_info.id'
    })
}


module.exports = { getAttendance, createAttendance, updateAttendance }