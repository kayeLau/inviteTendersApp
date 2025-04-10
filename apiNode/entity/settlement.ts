import { Entity, PrimaryGeneratedColumn, Column , ManyToOne , JoinColumn } from "typeorm"
import { AcPlace } from "./acPlace"

@Entity()
export class Settlement {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    placeId: number

    @Column()
    createUserId: number

    @Column({comment:"0:工人 1:帶班 2:老闆"})
    mode: number

    @Column({ nullable: true, length: 13 , comment:"记录日期" })
    settlementDate: string

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
