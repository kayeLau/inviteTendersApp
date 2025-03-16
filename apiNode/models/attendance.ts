import AppDataSource from '../data-source';
import { Attendance } from '../entity/attendance';
import { optionsGenerater } from './base_model';
const AttendanceRepository = AppDataSource.getRepository(Attendance);

export function createAttendance(list) {
    return AttendanceRepository.save(list).then(() => {
        return { success: true }
    })
}

export function updateAttendance(id, data) {
    return AttendanceRepository
        .createQueryBuilder()
        .update(Attendance)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getAttendance(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "bid")
    const total = await AttendanceRepository
        .createQueryBuilder("bid")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return AttendanceRepository
        .createQueryBuilder("bid")
        .select([
            "bid.id AS id",
            "bid.name AS name",
            "bid.password AS password",
            "bid.auth AS auth",
            "bid.shopPartition AS shopPartition",
            "bid.shopId AS shopId",
            "shop.shopName AS shopName",
            "partition.partitionName AS partitionName",
            "DATE_FORMAT(member.updateDate, '%Y-%m-%d %H:%i:%S') AS updateDate"
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