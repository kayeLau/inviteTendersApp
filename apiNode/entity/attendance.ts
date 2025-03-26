import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
import { Max } from 'class-validator';

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

    @Column()
    type: number

    @Column({ nullable: true, length: 13 })
    attendanceDate: string

    @Column({ default:0 })
    @Max(24)
    workingHours: number

    @Column({ default:0 })
    salary: number

    @Column({ nullable: true, length: 50 })
    costName: string

    @Column({ default:0 })
    cost: number

    @Column({ nullable: true, length: 100 })
    remark: string

    @Column({ nullable: true })
    recordImg: String

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
