import { updateApi, readApi, createApi } from '../models/api';

module.exports = class Api {

    readApi(req, res, next) {
        readApi().then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })

    }

    updateApi(req, res, next) {
        const data = {
            access: req.body.access,
            id: req.body.id,
        }

        updateApi(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createApi(req, res, next) {
        const data = {
            name: req.body.name,
            url: req.body.url
        }

        createApi(data).then(result => {
            res.json(result)
        }).catch(err => {
            next(err)
        })
    }

    createApiLog(req, res, next) {
        res.json({ success: true })
    }
}