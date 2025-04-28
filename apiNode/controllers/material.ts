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
            standard: req.body.standard,
            unit:req.body.unit,
            rentUnit:req.body.rentUnit
        }

        createMaterial(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateMaterial(req, res, next) {
        const id = req.body.id
        const data = {
            name: req.body.name,
            standard: req.body.standard,
            unit:req.body.unit,
            rentUnit:req.body.rentUnit
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