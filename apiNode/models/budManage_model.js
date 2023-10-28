const { checkRepeated, createNew , updateItem , deleteItem , getItems } = require('./base_model')

function createNewBud(data) {
    return checkRepeated("bud_info","bud_title",data.bud_title)
        .then(() => createNew("bud_info",data))
        .catch(err => err)
}

function updateBudInformation(id,data){
    return updateItem("bud_info",data,'bud_id',id)
}

function deleteBudItem(id){
    return deleteItem("bud_info",'bud_id',id)
}

function getBudItems(options,size,page){
    return getItems("bud_info",options,size,page)
}


module.exports = { getBudItems , createNewBud , updateBudInformation , deleteBudItem }