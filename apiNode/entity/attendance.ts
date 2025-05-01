import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
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

    @Column({ comment: "员工号", nullable: true })
    staffId: string

    @Column({ comment: "0:记整工 1:记點工 2:记帐" })
    type: number

    @Column({ comment: "0:工人 1:帶班 2:老闆" })
    mode: number

    @Column({ comment: "记录日期", length: 13 })
    attendanceDate: string

    @Column({ default: 0 })
    @Max(24)
    workingHours: number

    @Column({ default: 0, comment: "时薪" })
    salary: number

    @Column({ nullable: true, length: 50, comment: "费用名" })
    costName: string

    @Column({ default: 0 })
    cost: number

    @Column({ default: 0, comment: "0:工地拨款 1:费用支出 2:个人支出" })
    costType: number

    @Column({ nullable: true, length: 100 })
    remark: string

    @Column({ nullable: true })
    recordImg: String

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date

    @ManyToOne(() => AcPlace, place => place.name)
    @JoinColumn({ name: "placeId" })
    acPlace: AcPlace;
}
