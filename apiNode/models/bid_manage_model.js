const { checkRepeated, createNew , updateItem , deleteItem , getItems , customQuery } = require('./base_model')
const db = require('./connection_db')

function createNewBid(data) {
    return checkRepeated("bid_info","bid_title",data.bid_title)
        .then(() => createNew("bid_info",data))
        .catch(err => err)
}

function updateBid(id,data){
    return updateItem("bid_info",data,'bid_id',id)
}

function deleteBidItem(id){
    return deleteItem("bid_info",'bid_id',id)
}

function getBidItems(options,size,page){
    return getItems({table:"bid_info",options,size,page})
}

function insertBidItems(list) {
    return customQuery(`INSERT IGNORE INTO bid_info (
        bid_id,
        bid_title,
        bid_body,
        bid_table,
        release_time,
        bid_unit,
        bid_type,
        pj_type,
        bid_city,
        bid_contact,
        bid_amount,
        data_source,
        data_href,
        update_time) VALUES ? `, [list] )
}

module.exports = { getBidItems , createNewBid , updateBid , deleteBidItem , insertBidItems , checkRepeated }