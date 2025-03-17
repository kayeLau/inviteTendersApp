import AppDataSource from '../data-source';
import { User } from '../entity/user';
import { optionsGenerater } from './base_model';
const UserRepository = AppDataSource.getRepository(User);

export async function registerUser(data) {
    const existing = await UserRepository
        .createQueryBuilder("user")
        .where("User.openId = :openId", { openId: data.openId })
        .getOne()

    if (!existing) {
        const newItem = UserRepository.create({ ...data });
        await UserRepository.save(newItem);
        return { success: true };
    } else {
        return {
            msg: "創建項已存在",
            success: false
        };
    }
}

export function updateUser(id,data){
    return UserRepository
    .createQueryBuilder()
    .update(User)
    .set({ ...data })
    .where("id = :id", { id })
    .execute()
    .then(() => { return { success: true } })
    .catch((err) => {
        return Promise.reject({ success: false, message: err.message })
    })
}


export async function getUsersItemById(options) {
    const { conditions, parameters } = optionsGenerater(options, "user")
    const total = await UserRepository
        .createQueryBuilder("user")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return UserRepository
        .createQueryBuilder("user")
        .select([
            "user.id AS id",
            "user.openId AS openId",
            "user.sessionKey AS sessionKey",
            "DATE_FORMAT(user.updateTime, '%Y-%m-%d %H:%i:%S') AS updateTime"
        ])
        .where(conditions.join(" AND "), parameters)
        .limit(1)
        .getRawMany()
        .then((result) => {
            return {
                success: true,
                data: result
            };
        })
}