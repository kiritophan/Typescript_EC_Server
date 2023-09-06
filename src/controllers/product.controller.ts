import productModel from "../models/product.model";
import { Request, Response } from "express";

export default {
    create: async function(req: Request, res: Response) {
        console.log("req", req.body)
        console.log("files", req.files)
        let newProduct = {
            ...(JSON.parse(req.body.product)),
            avatar: "abc.jpg"
        }
        console.log("newProduct", newProduct)
        return
        // try {
        //    let modelRes = await productModel.create();
        //     return res.status(modelRes.status ? 200 : 213).json(modelRes);
        // }catch(err){
        //     return res.status(500).json({
        //         message: "Lỗi controller"
        //     })
        // }
    }
}