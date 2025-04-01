import { Entity, PrimaryGeneratedColumn, Column , ManyToOne , JoinColumn } from "typeorm"
import { Max } from 'class-validator';
import { AcPlace } from "./acPlace"

@Entity()
export class Attendance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    placeId: number

    @Column()
    createUserId: number

    @Column({comment:"员工号"})
    staffId: string

    @Column({comment:"0:记工 1:记帐"})
    type: number

    @Column({ nullable: true, length: 13 , comment:"记录日期" })
    attendanceDate: string

    @Column({ default:0 })
    @Max(24)
    workingHours: number

    @Column({ default:0 , comment:"时薪"})
    salary: number

    @Column({ nullable: true, length: 50 , comment:"费用名" })
    costName: string

    @Column({ default:0 })
    cost: number

    @Column({ nullable: true, length: 100 })
    remark: string

    @Column({ nullable: true })
    recordImg: String

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date

    @ManyToOne(() => AcPlace, place => place.name)
    @JoinColumn({ name: "placeId" })
    AcPlace: AcPlace;
}
