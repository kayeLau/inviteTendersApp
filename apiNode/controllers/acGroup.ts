import { createGroup , updateGroup , deleteGroup , getGroups } from '../models/acGroup'

module.exports = class Group {
    getGroups(req, res, next) {
        const userInfo = req.userInfo
        const options = { createUserId: userInfo.id , placeId: userInfo.current_placeId }
        const size = req.body.size
        const page = req.body.page


        getGroups(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createGroup(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            createUserId: userInfo.id,
            name: req.body.name,
            placeId: req.body.placeId,
            members:req.body.members
        }

        createGroup(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateGroup(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.createUserId,
            name: req.body.name,
            members:req.body.members
        }


        updateGroup(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteGroup(req, res, next) {
        const id = req.body.createUserId

        deleteGroup(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}