import { createMaterial , updateMaterial , deleteMaterial , getMaterials } from '../models/material'

module.exports = class Material {
    getMaterials(req, res, next) {
        const userInfo = req.userInfo
        const options = { createUserId: userInfo.id , placeId: userInfo.current_placeId }
        const size = req.body.size
        const page = req.body.page


        getMaterials(options, size, page).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createMaterial(req, res, next) {
        const userInfo = req.userInfo
        const data = {
            createUserId: userInfo.id,
            name: req.body.name,
            placeId: req.body.placeId,
            members:req.body.members
        }

        createMaterial(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateMaterial(req, res, next) {
        const userInfo = req.userInfo
        const id = req.body.id
        const data = {
            createUserId: userInfo.createUserId,
            name: req.body.name,
            members:req.body.members
        }


        updateMaterial(id, data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }


    deleteMaterial(req, res, next) {
        const id = req.body.createUserId

        deleteMaterial(id).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }
}