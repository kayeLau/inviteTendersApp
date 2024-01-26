const { createNew , updateItem , deleteItem , getItems } = require('./base_model')

function createNewAttendance(data) {
    return createNew("attendance_info",data)
}

function updateAttendanceInformation(id,data){
    return updateItem("attendance_info",data,'id',id)
}

function deleteAttendanceItem(id){
    return deleteItem("attendance_info",'id',id)
}

function getAttendanceItems(options,size,page){
    return getItems({table:"attendance_info",options,size,page})
}


module.exports = { getAttendanceItems , createNewAttendance , updateAttendanceInformation , deleteAttendanceItem }