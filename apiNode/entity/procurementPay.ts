import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class procurementPay {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createUserId: number

    @Column({ comment:'0:工头 1:老板'})
    type: number

    @Column({ comment:'采购'})
    procurement: number

    @Column({ comment:'已付' })
    paid: number

    @Column({ nullable: true, length: 100 })
    remark: string

    @Column({ nullable: true })
    recordImg: String

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
