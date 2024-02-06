const { createNew , updateItem , deleteItem , getItems } = require('./base_model')

function createNewPlaceMember(data) {
    return createNew("place_member_info",data)
}

function updatePlaceMember(id,data){
    return updateItem("place_member_info",data,'id',id)
}

function deletePlaceMemberItem(id){
    return deleteItem("place_member_info",'id',id)
}

function getPlaceMemberItems(options,size,page){
    return getItems({table:"place_member_info",options,size,page})
}


module.exports = { getPlaceMemberItems , createNewPlaceMember , updatePlaceMember , deletePlaceMemberItem }