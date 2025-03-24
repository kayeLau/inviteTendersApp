import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Attendance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    placeId: number

    @Column()
    createUserId: number

    @Column()
    staffId: number

    @Column({ nullable: true, length: 13 })
    attendanceDate: string

    @Column({ nullable: true })
    workingHours: number

    @Column({ nullable: true, length: 50 })
    costName: string

    @Column({ nullable: true })
    cost: number

    @Column({ nullable: true, length: 100 })
    remarkWK: string

    @Column({ nullable: true, length: 100 })
    remarkAC: string

    @Column({ nullable: true })
    recordImgWK: String

    @Column({ nullable: true })
    recordImgAC: String

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
