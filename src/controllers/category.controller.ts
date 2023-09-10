import categoryModel from "../models/category.model";
import { Request, Response } from "express";
import fs from 'fs'
import { uploadFileToStorage } from "../firebase";

export default {
    findMany: async function (req: Request, res: Response) {
        try {
            let modelRes = await categoryModel.findMany();
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }
    },
    findByCategory: async function (req: Request, res: Response) {
        try {
            let result = await categoryModel.findByCategory(parseInt(req.params.category_id));

            return res.status(200).json({
                message: result.message,
                data: result.data
            })

        } catch (err) {
            return res.status(500).json({
                message: "Lỗi không xác định!"
            })
        }
    },
    create: async function (req: Request, res: Response) {
        let data = JSON.parse(req.body.category);
        let newProduct = {
            ...data,
            avatar: "abc.jpg"
        }
        console.log("newProduct", newProduct)
        if (req.files) {
            let avatarUrl = await uploadFileToStorage((req.files as any)[0], "typescript", fs.readFileSync((req.files as any)[0].path))
            fs.unlink((req.files as any)[0].path, (err) => {

            })
            newProduct.avatar = avatarUrl
        }
        try {
            let modelRes = await categoryModel.create(newProduct);
            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {
            return res.status(500).json({
                message: "Lỗi controller"
            })
        }

    },
}