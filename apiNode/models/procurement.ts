import AppDataSource from '../data-source';
import { Procurement } from '../entity/procurement';
import { optionsGenerater } from './module/base_model';
import { getProcurementPays } from './procurementPay'
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

export async function getProcurementUnpay(id: number) {
    try {
        const procurement = await ProcurementRepository
            .createQueryBuilder("Procurement")
            .select([
                "Procurement.price AS price ",
                "Procurement.quantity AS quantity "
            ])
            .where("id = :id", { id })
            .getRawOne()

        let unpay = (procurement.price * procurement.quantity)

        const options = { procurementId: id }
        const procurementPays = await getProcurementPays(options, 999, 1)
        if (procurementPays.success && procurementPays.data.length) {
            const payed = procurementPays.data.reduce((acc, curr) => {
                return acc + curr.paid
            }, 0)
            unpay = unpay - payed
        }

        return unpay
    } catch (err) {
        return Promise.reject({ success: false, message: err.message })
    }

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
        .leftJoinAndSelect("Procurement.material", "Material")
        .select([
            "Procurement.id AS id",
            "Procurement.createUserId AS createUserId",
            "Procurement.name AS name",
            "Procurement.type AS type",
            "Procurement.unpay AS unpay ",
            "Procurement.price AS price ",
            "Procurement.quantity AS quantity ",
            "Procurement.remark AS remark ",
            "Procurement.recordImg AS recordImg ",
            "Procurement.materialId AS materialId ",
            "Material.name AS materialName ",
            "Material.unit AS unit ",
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