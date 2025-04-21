import AppDataSource from '../data-source';
import { AcGroup } from '../entity/acGroup';
import { optionsGenerater } from './module/base_model';
const AcGroupRepository = AppDataSource.getRepository(AcGroup);

export async function createGroup(data) {
    const newItem = AcGroupRepository.create({ ...data });
    await AcGroupRepository.save(newItem);
    return { success: true };
}


export function updateGroup(id: number, data) {
    return AcGroupRepository
        .createQueryBuilder()
        .update(AcGroup)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function deleteGroup(id: number) {
    return AcGroupRepository
        .createQueryBuilder()
        .delete()
        .from(AcGroup)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getGroups(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "AcGroup")
    const total = await AcGroupRepository
        .createQueryBuilder("AcGroup")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return AcGroupRepository
        .createQueryBuilder("AcGroup")
        .select([
            "AcGroup.id AS id",
            "AcGroup.createUserId AS createUserId",
            "AcGroup.name AS name",
            "AcGroup.members AS members",
            "DATE_FORMAT(AcGroup.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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