import AppDataSource from '../data-source';
import { Api } from '../entity/api';
const apiRepository = AppDataSource.getRepository(Api)

export function updateApi(data) {
    return apiRepository
        .createQueryBuilder('api')
        .update(Api)
        .set({ access: data.access })
        .where("api.id = :id", { id: data.id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export function readApi() {
    return apiRepository
        .createQueryBuilder('api')
        .getMany()
        .then(result => {
            return {
                data: result.filter(item => item.access !== '*' && item.access !== '-1'),
                success: true
            }
        })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export function readApiByPath(url) {
    return apiRepository
        .createQueryBuilder('api')
        .where("api.url = :url", { url: url })
        .getOne()
        .then(result => {
            return {
                data: result,
                success: true
            }
        })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export function createApi(data) {
    return apiRepository.save(data)
}