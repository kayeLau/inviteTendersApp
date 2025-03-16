import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Bid {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ comment: '标题' })
    bid_title: string

    @Column({ type: 'longtext', nullable: true, comment: '正文' })
    bid_body: string

    @Column({ nullable: true, comment: '表格' })
    bid_table: string

    @Column({ type: 'date', nullable: true, comment: '发布时间' })
    release_time: Date;

    @Column({ nullable: true, comment: '招采单位' })
    bid_unit: string

    @Column({ nullable: true, comment: '招标类型；0：政府项目 1：企业项目' })
    bid_type: number

    @Column({ nullable: true, comment: '项目类型' })
    pj_type: number

    @Column({ nullable: true, comment: '招标城市' })
    bid_city: number

    @Column({ nullable: true, comment: '招标联系方式' })
    bid_contact: string

    @Column({ nullable: true, comment: '项目金额' })
    bid_amount: number

    @Column({ nullable: true, comment: '数据来源' })
    data_source: number

    @Column({ nullable: true, comment: '原文連接' })
    data_href: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date;
}
