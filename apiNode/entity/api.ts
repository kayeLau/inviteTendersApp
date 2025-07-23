import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Api {

    @PrimaryGeneratedColumn()
    id: number

    @Column({length: 50})
    name: string

    @Column({length: 100})
    url: string

    @Column({ nullable:true , length:50 })
    access: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateDate: Date;
}
