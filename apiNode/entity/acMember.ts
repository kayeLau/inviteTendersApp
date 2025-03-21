import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class AcMember {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createUserId: number
    
    @Column({nullable:true})
    placeId: number

    @Column({length: 50, nullable:true})
    name: string

    @Column({length: 50, nullable:true})
    phoneNumber: string

    @Column({nullable:true})
    jobType: String

    @Column()
    salary: number

    @Column()
    gender: number

    @Column({length: 50, nullable:true})
    idCardNumber: string

    @Column({length: 50, nullable:true})
    bank: string

    @Column({length: 50, nullable:true})
    bankNumber: string

    @Column({length: 50, nullable:true})
    remark: string

    @Column()
    state: number

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
