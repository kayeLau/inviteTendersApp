import AppDataSource from '../data-source';
import { Material } from '../entity/material';
import { optionsGenerater } from './module/base_model';
const MaterialRepository = AppDataSource.getRepository(Material);

export async function createMaterial(data) {
    const newItem = MaterialRepository.create({ ...data });
    await MaterialRepository.save(newItem);
    return { success: true };
}


export function updateMaterial(id: number, data) {
    return MaterialRepository
        .createQueryBuilder()
        .update(Material)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function deleteMaterial(id: number) {
    return MaterialRepository
        .createQueryBuilder()
        .delete()
        .from(Material)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getMaterials(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "Material")
    const total = await MaterialRepository
        .createQueryBuilder("Material")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return MaterialRepository
        .createQueryBuilder("Material")
        .select([
            "Material.id AS id",
            "Material.createUserId AS createUserId",
            "Material.name AS name",
            "Material.standard AS standard",
            "Material.unit AS unit",
            "Material.rentUnit AS rentUnit",
            "DATE_FORMAT(Material.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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