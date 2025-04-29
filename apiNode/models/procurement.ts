import AppDataSource from '../data-source';
import { Procurement } from '../entity/procurement';
import { optionsGenerater } from './module/base_model';
const ProcurementRepository = AppDataSource.getRepository(Procurement);

export async function createProcurement(data) {
    const newItem = ProcurementRepository.create({ ...data });
    await ProcurementRepository.save(newItem);
    return { success: true };
}


export function updateProcurement(id: number, data) {
    return ProcurementRepository
        .createQueryBuilder()
        .update(Procurement)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function deleteProcurement(id: number) {
    return ProcurementRepository
        .createQueryBuilder()
        .delete()
        .from(Procurement)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getProcurements(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "Procurement")
    const total = await ProcurementRepository
        .createQueryBuilder("Procurement")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return ProcurementRepository
        .createQueryBuilder("Procurement")
        .select([
            "Procurement.id AS id",
            "Procurement.createUserId AS createUserId",
            "Procurement.name AS name",
            "Procurement.type AS type",
            "Procurement.standard AS standard",
            "Procurement.unit AS unit",
            "Procurement.rentUnit AS rentUnit",
            "Procurement.price AS price ",
            "Procurement.quantity AS quantity ",
            "Procurement.remark AS remark ",
            "Procurement.recordImg AS recordImg ",
            "DATE_FORMAT(Procurement.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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