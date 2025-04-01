import AppDataSource from '../data-source';
import { Bid } from '../entity/bid';
import { optionsGenerater } from './module/base_model';
const BidRepository = AppDataSource.getRepository(Bid);

export async function createBid(data) {
    const existing = await BidRepository
        .createQueryBuilder("Bid")
        .where("Bid.title = :title", { title: data.title })
        .getOne()

    if (!existing) {
        const newItem = BidRepository.create({ ...data });
        await BidRepository.save(newItem);
        return { success: true };
    } else {
        return {
            msg: "創建項已存在",
            success: false
        };
    }
}

export function updateBid(id, data) {
    return BidRepository
        .createQueryBuilder()
        .update(Bid)
        .set({ ...data })
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export function deleteBid(id) {
    return BidRepository
        .createQueryBuilder()
        .delete()
        .from(Bid)
        .where("id = :id", { id })
        .execute()
        .then(() => { return { success: true } })
        .catch((err) => {
            return Promise.reject({ success: false, message: err.message })
        })
}

export async function getBids(options, size, page) {
    const { conditions, parameters } = optionsGenerater(options, "Bid")
    const total = await BidRepository
        .createQueryBuilder("Bid")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return BidRepository
        .createQueryBuilder("Bid")
        .select([
            "Bid.id AS id",
            "Bid.BidTitle AS bidTitle",
            "Bid.BidBody AS bidBody",
            "Bid.BidTable AS bidTable",
            "Bid.releaseTime AS releaseTime",
            "Bid.BidUnit AS bidUnit",
            "Bid.BidType AS bidType",
            "Bid.BidCity AS bidCity",
            "Bid.BidContact AS bidContact",
            "Bid.pjType AS pjType",
            "Bid.dataSource AS dataSource",
            "Bid.dataHref AS dataHref",
            "DATE_FORMAT(Bid.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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


export function insertBidItems(list) {
    return BidRepository.save(list).then(() => {
        return { success: true }
    })
}

