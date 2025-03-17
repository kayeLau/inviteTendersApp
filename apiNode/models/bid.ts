import AppDataSource from '../data-source';
import { Bid } from '../entity/bid';
import { optionsGenerater } from './base_model';
const BidRepository = AppDataSource.getRepository(Bid);

export async function createBid(data) {
    const existing = await BidRepository
        .createQueryBuilder("bid")
        .where("bid.title = :title", { title: data.title })
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
    const { conditions, parameters } = optionsGenerater(options, "bid")
    const total = await BidRepository
        .createQueryBuilder("bid")
        .where(conditions.join(" AND "), parameters)
        .getCount();

    return BidRepository
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
            "DATE_FORMAT(bid.updateTime, '%Y-%m-%d %H:%i:%S') AS updateDate"
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

