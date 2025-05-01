import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Procurement {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createUserId: number

    @Column({length: 50, nullable:true})
    name: string

    @Column({ comment:'0:采购 1:租'})
    type: string

    @Column({ comment:'材料'})
    material: number

    @Column({ comment:'单位' })
    unit: string

    @Column({ comment:'单价' })
    price: number

    @Column({ comment:'採购数量' })
    quantity: number

    @Column({ nullable: true, length: 100 })
    remark: string

    @Column({ nullable: true })
    recordImg: String

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
