import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import ProductPictureEntity from './productPicture.entity'

@Entity()
class Products {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @OneToMany(() => ProductPictureEntity, (picture) => picture.product)
    pictures!: ProductPictureEntity[]
}

export default Products