import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class AcGroup {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    createUserId: number

    @Column({length: 50, nullable:true})
    name: string

    @Column()
    members: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date
}
