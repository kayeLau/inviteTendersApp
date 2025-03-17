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
            "bid.bidTitle AS bidTitle",
            "bid.bidBody AS bidBody",
            "bid.bidTable AS bidTable",
            "bid.releaseTime AS releaseTime",
            "bid.bidUnit AS bidUnit",
            "bid.bidType AS bidType",
            "bid.bidCity AS bidCity",
            "bid.bidContact AS bidContact",
            "bid.pjType AS pjType",
            "bid.dataSource AS dataSource",
            "bid.dataHref AS dataHref",
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