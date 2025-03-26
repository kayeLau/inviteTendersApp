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
    const { conditions, parameters } = optionsGenerater(options, "Attendance")
    const total = await AttendanceRepository
        .createQueryBuilder("Attendance")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return AttendanceRepository
        .createQueryBuilder("Attendance")
        .select([
            "Attendance.id AS id",
            "Attendance.placeId AS placeId",
            "Attendance.createUserId AS createUserId",
            "Attendance.staffId AS staffId",
            "Attendance.remark AS remark",
            "Attendance.recordImg AS recordImg",
            "Attendance.attendanceDate AS attendanceDate",
            "Attendance.workingHours AS workingHours",
            "Attendance.costName AS costName",
            "Attendance.cost AS cost",
            "Attendance.salary AS salary",
            "Attendance.type AS type",
            "DATE_FORMAT(Attendance.updateTime, '%Y-%m-%d %H:%i:%S') AS updateTime"
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