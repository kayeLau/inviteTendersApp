const { createNew , updateItem , deleteItem , getItems } = require('./base_model')

export function createPlace(data) {
    return createNew("place_info",data)
}

export function updatePlace(id,data){
    return updateItem("place_info",data,'id',id)
}

export function deletePlace(id){
    return deleteItem("place_info",'id',id)
}

export function getPlaces(options,size,page){
    return getItems({table:"place_info",options,size,page})
}
