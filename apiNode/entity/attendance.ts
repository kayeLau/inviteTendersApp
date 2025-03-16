import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Attendance {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    place_id: number

    @Column()
    create_user_id: number

    @Column()
    staff_id: number

    @Column()
    remark: string

    @Column({ type: 'date' })
    attendance_date: Date

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    update_time: Date
}
