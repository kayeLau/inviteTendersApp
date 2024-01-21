const { checkRepeated, createNew , updateItem , deleteItem , getItems } = require('./base_model')
const db = require('./connection_db')

function createNewPlace(data) {
    return createNew("place_info",data)
}

function updatePlaceInformation(id,data){
    return updateItem("place_info",data,'id',id)
}

function deletePlaceItem(id){
    return deleteItem("place_info",'id',id)
}

function getPlaceItems(options,size,page){
    return getItems({table:"place_info",options,size,page})
}


module.exports = { getPlaceItems , createNewPlace , updatePlaceInformation , deletePlaceItem }