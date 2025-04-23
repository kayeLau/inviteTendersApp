import AppDataSource from '../data-source';
import { AcMember } from '../entity/acMember';
import { optionsGenerater } from './module/base_model';
const AcMemberRepository = AppDataSource.getRepository(AcMember);

export async function createMember(data) {
    const newItem = AcMemberRepository.create({ ...data });
    await AcMemberRepository.save(newItem);
    return { success: true };
}


export function updateMember(id: number, data) {
    return AcMemberRepository
        .createQueryBuilder()
        .update(AcMember)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function deleteMember(id: number) {
    return AcMemberRepository
        .createQueryBuilder()
        .delete()
        .from(AcMember)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getMembers(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "AcMember")
    const total = await AcMemberRepository
        .createQueryBuilder("AcMember")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return AcMemberRepository
        .createQueryBuilder("AcMember")
        .select([
            "AcMember.id AS id",
            "AcMember.createUserId AS createUserId",
            "AcMember.placeId AS placeId",
            "AcMember.name AS name",
            "AcMember.phoneNumber AS phoneNumber",
            "AcMember.jobType AS jobType",
            "AcMember.salary AS salary",
            "AcMember.gender AS gender",
            "AcMember.idCardNumber AS idCardNumber",
            "AcMember.bank AS bank",
            "AcMember.bankNumber AS bankNumber",
            "AcMember.remark AS remark",
            "AcMember.state AS state",
            "DATE_FORMAT(AcMember.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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

export async function getMembersByIds(ids, createUserId) {
    if(!ids.length){
        return {
            success: true,
            data: []
        }
    }
    
    return AcMemberRepository
        .createQueryBuilder("AcMember")
        .select([
            "AcMember.id AS id",
            "AcMember.name AS name",
            "AcMember.phoneNumber AS phoneNumber",
        ])
        .where("id IN (:...ids) AND createUserId = :createUserId", { ids, createUserId })
        .getRawMany()
        .then((result) => {
            return {
                success: true,
                data: result
            };
        })
}