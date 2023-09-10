import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default {
    create: async function (newProduct: any, productPictures: any) {
        try {
            let product = await prisma.products.create({
                data: {
                    ...newProduct,
                    productPictures: {
                        createMany: {
                            data: [
                                ...productPictures
                            ]
                        }
                    }
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Create product ok!",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    findByCategory: async function (categoryId: string) {
        try {
            let products = await prisma.products.findMany({
                where: {
                    categoryId: categoryId
                }
            });
            return {
                status: true,
                message: "Get product by category ok!",
                data: products
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    findMany: async function () {
        try {
            let products = await prisma.products.findMany({
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Get products ok!",
                data: products
            }
        } catch (err) {
            console.log("lỗi", err)
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
    findById: async function (productId: string) {
        try {
            let product = await prisma.products.findUnique({
                where: {
                    id: productId
                },
                include: {
                    productPictures: true
                }
            });

            return {
                status: true,
                message: "Get product detail ok!",
                data: product
            }
        } catch (err) {
            return {
                status: false,
                message: "Lỗi model",
                data: null
            }
        }
    },
}