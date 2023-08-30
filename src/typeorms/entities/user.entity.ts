import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    firstName!: string

    @Column()
    lastName!: string

    @Column({
        default: 1
    })
    age!: number

    @Column({
        nullable: true
    })
    avatar!: string
}

export default Users