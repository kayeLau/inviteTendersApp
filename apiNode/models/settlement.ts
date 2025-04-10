import AppDataSource from '../data-source';
import { Settlement } from '../entity/settlement';
import { optionsGenerater } from './module/base_model';
const SettlementRepository = AppDataSource.getRepository(Settlement);

export async function createSettlement(data) {
    try {
        await SettlementRepository.save(data)
        return { success: true }
    }catch(err){
        return { success: false, message: err.message }
    }
}

export function updateSettlement(id, data) {
    return SettlementRepository
        .createQueryBuilder()
        .update(Settlement)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getSettlement(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "Settlement")
    const total = await SettlementRepository
        .createQueryBuilder("Settlement")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return SettlementRepository
        .createQueryBuilder("Settlement")
        .leftJoinAndSelect("Settlement.AcPlace", "AcPlace")
        .select([
            "Settlement.id AS id",
            "Settlement.placeId AS placeId",
            "AcPlace.name AS placeName",
            "Settlement.createUserId AS createUserId",
            "Settlement.remark AS remark",
            "Settlement.recordImg AS recordImg",
            "Settlement.SettlementDate AS SettlementDate",
            "Settlement.cost AS cost",
            "DATE_FORMAT(Settlement.updateTime, '%Y-%m-%d %H:%i:%S') AS updateTime"
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