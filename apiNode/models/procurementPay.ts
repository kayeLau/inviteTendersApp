import AppDataSource from '../data-source';
import { ProcurementPay } from '../entity/procurementPay';
import { optionsGenerater } from './module/base_model';
const ProcurementPayRepository = AppDataSource.getRepository(ProcurementPay);

export async function createProcurementPay(data) {
    const newItem = ProcurementPayRepository.create({ ...data });
    await ProcurementPayRepository.save(newItem);
    return { success: true };
}


export function updateProcurementPay(id: number, data) {
    return ProcurementPayRepository
        .createQueryBuilder()
        .update(ProcurementPay)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function deleteProcurementPay(id: number) {
    return ProcurementPayRepository
        .createQueryBuilder()
        .delete()
        .from(ProcurementPay)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getProcurementPays(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "ProcurementPay")
    const total = await ProcurementPayRepository
        .createQueryBuilder("ProcurementPay")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return ProcurementPayRepository
        .createQueryBuilder("ProcurementPay")
        .select([
            "ProcurementPay.id AS id",
            "ProcurementPay.createUserId AS createUserId",
            "ProcurementPay.type AS type",
            "ProcurementPay.procurementId AS procurementId",
            "ProcurementPay.paid AS paid",
            "ProcurementPay.remark AS remark ",
            "ProcurementPay.recordImg AS recordImg ",
            "DATE_FORMAT(ProcurementPay.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
        ])
        .where(conditions.join(" AND "), parameters)
        .offset((page - 1) * size)
        .limit(size)
        .getRawMany()
        .then((result) => {
            return {
                success: true,
                data: result,
                page,
                size,
                total
            };
        })
}