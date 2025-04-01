import AppDataSource from '../data-source';
import { AcPlace } from '../entity/acPlace';
import { optionsGenerater } from './module/base_model';
const AcPlaceRepository = AppDataSource.getRepository(AcPlace);

export async function createPlace(data) {
    const newItem = AcPlaceRepository.create({ ...data });
    await AcPlaceRepository.save(newItem);
    return { success: true };
}


export function updatePlace(id: number, data) {
    return AcPlaceRepository
        .createQueryBuilder()
        .update(AcPlace)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function deletePlace(id: number) {
    return AcPlaceRepository
        .createQueryBuilder()
        .delete()
        .from(AcPlace)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getPlaces(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "AcPlace")
    const total = await AcPlaceRepository
        .createQueryBuilder("AcPlace")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return AcPlaceRepository
        .createQueryBuilder("AcPlace")
        .select([
            "AcPlace.id AS id",
            "AcPlace.createUserId AS createUserId",
            "AcPlace.name AS name",
            "AcPlace.state AS state",
            "AcPlace.attendanceTime AS attendanceTime",
            "AcPlace.attendanceUnit AS attendanceUnit",
            "DATE_FORMAT(AcPlace.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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