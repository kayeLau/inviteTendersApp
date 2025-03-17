import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class AcPlace {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    placeId: number

    @Column()
    createUserId: number

    @Column()
    staffId: number

    @Column()
    remark: string

    @Column({ type: 'date' })
    attendanceDate: Date

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
