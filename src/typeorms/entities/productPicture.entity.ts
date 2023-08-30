import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import ProductEntity from "./product.entity"

@Entity()
class ProductPictures {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    url!: string

    @OneToMany(() => ProductEntity, (product) => product.pictures)
    product!: ProductEntity
}

export default ProductPictures