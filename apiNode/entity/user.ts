import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 50, nullable:true })
    name: string

    @Column({ length: 50, nullable:true })
    phone: string

    @Column({ length: 50 })
    openId: string

    @Column({ length: 50 })
    sessionKey: string

    @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updateTime: Date;

    @Column({ nullable:true })
    defaultPlaceId: number

    @Column({ comment:'0:未登录用户 1:登錄用戶 2:付費用戶' })
    auth: number

}
