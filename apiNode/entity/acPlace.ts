import { Entity, PrimaryGeneratedColumn, Column , OneToMany } from "typeorm"
import { Attendance } from "./attendance"

@Entity()
export class AcPlace {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createUserId: number

    @Column({ length: 50 })
    name: string

    @Column({})
    state: number

    @Column({})
    attendanceTime: number

    @Column({ length: 50 })
    attendanceUnit: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date

    @OneToMany(() => Attendance, attendance => attendance.AcPlace)
    attendances: Attendance[];
}
