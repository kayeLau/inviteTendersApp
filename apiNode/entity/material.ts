import { Entity, PrimaryGeneratedColumn, Column , OneToMany } from "typeorm"
import { Attendance } from "./attendance"

@Entity()
export class Material {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createUserId: number

    @Column({ length: 50 })
    name: string

    @Column({})
    standard: string

    @Column({ comment:'採購单位' })
    unit: string

    @Column({ comment:'租赁单位' })
    rentUnit: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
