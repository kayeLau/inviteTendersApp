import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Bid {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ comment: '标题' })
    bidTitle: string

    @Column({ type: 'longtext', nullable: true, comment: '正文' })
    bidBody: string

    @Column({ nullable: true, comment: '表格' })
    bidTable: string

    @Column({ type: 'date', nullable: true, comment: '发布时间' })
    releaseTime: Date;

    @Column({ nullable: true, comment: '招采单位' })
    bidUnit: string

    @Column({ nullable: true, comment: '招标类型；0：政府项目 1：企业项目' })
    bidType: number

    @Column({ nullable: true, comment: '项目类型' })
    pjType: number

    @Column({ nullable: true, comment: '招标城市' })
    bidCity: number

    @Column({ nullable: true, comment: '招标联系方式' })
    bidContact: string

    @Column({ nullable: true, comment: '项目金额' })
    bidAmount: number

    @Column({ nullable: true, comment: '数据来源' })
    dataSource: number

    @Column({ nullable: true, comment: '原文連接' })
    dataHref: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date;
}
