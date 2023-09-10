import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    findMany: async function () {
        try {
            let categories = await prisma.categories.findMany();

            return {
                status: true,
                message: "Get categories ok!",
                data: categories
            }
        } catch (err) {
            console.log("err", err);

            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    findByCategory: async function (category_id: any) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    categoryId: category_id
                }
            });
            return {
                message: "Get products success!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi không xác định!"
            }
        }
    },
    create: async function (newCategory: any) {
        try {
            let category = await prisma.categories.create({
                data: {
                    ...newCategory
                }
            })
            return {
                status: true,
                message: "Create categories ok!",
                data: category
            }
        } catch (err) {
            console.log("err", err)
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    }
}