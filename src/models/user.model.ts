/* Setup TypeORMS */
import { myDataSource } from '../typeorms/app-data-source'
import User from '../typeorms/entities/user.entity';
import Product from '../typeorms/entities/product.entity'

const users = [
    {
        name: "phuoc",
        age: 20
    },
    {
        name: "huong",
        age: 22
    }
];

export default {
    find: function () {
        return {
            status: true,
            message: "ok",
            data: users
        }
    },
    // create: async function () {
    //     let user = await myDataSource
    //         .createQueryBuilder()
    //         .insert()
    //         .into(User)
    //         .values([
    //             { firstName: "Timber", lastName: "Saw" },
    //         ])
    //         .execute()

    //     console.log("user", user)
    // }
    create: async function () {
        // let user = myDataSource
        //     .getRepository(User)
        //     .create({ firstName: "nttb", lastName: "Saw" })
        // const results = await myDataSource.getRepository(User).save(user)
        // console.log("user", results);
        const queryRunner = myDataSource.createQueryRunner();
        await queryRunner.connect()
        await queryRunner.startTransaction()
        try {
            let product = queryRunner.manager
                .getRepository(Product)
                .create({ name: "Sản Phẩm 3" })
            const results2 = await queryRunner.manager.getRepository(Product).save(product)


            let user = queryRunner.manager
                .getRepository(User)
                .create({ firstName: "Timber 12", lastName: "Phước" })
            const results1 = await queryRunner.manager.getRepository(User).save(user)

            // commit transaction now:
            await queryRunner.commitTransaction()
        } catch (err) {
            await queryRunner.rollbackTransaction()
        }
    }
}


