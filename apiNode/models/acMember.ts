const { createNew , updateItem , deleteItem , getItems } = require('./base_model')

export function createMember(data) {
    return createNew("place_member_info",data)
}

export function updateMember(id,data){
    return updateItem("place_member_info",data,'id',id)
}

export function deleteMember(id){
    return deleteItem("place_member_info",'id',id)
}

export function getMembers(options,size,page){
    return getItems({table:"place_member_info",options,size,page})
}