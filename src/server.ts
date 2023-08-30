/* Load file .env */
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'

/* Tạo ra server */

const server = express();

/* Setup TypeORMS */
import { myDataSource } from './typeorms/app-data-source'

try {
    myDataSource
        .initialize()
        .then(() => {
            console.log("TypeORMS thành công!")
        })
        .catch((err) => {
            console.error("TypeORMS thất bại!")
        })
} catch (err) {
    console.log("Lỗi cú pháp!")
}

import cors from 'cors'
server.use(cors());

/* Setup body parser */

import bodyParser from 'body-parser';
server.use(bodyParser.json())

import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import { Request, Response } from 'express';

server.use("/test", async (req: Request, res: Response) => {
    try {
        let newTest = prisma.tests.create({
            data: {
                title: "Test lần 1"
            }
        })

        let newUser = prisma.users.create({
            data: {
                userName: "admin",
                password: "123",
                avatar: "abc.png",
                email: "1@",
                isActive: true,
                address: [
                    {
                        provinceId: 1,
                        provinceName: "Tỉnh 1",
                        districtId: 2,
                        districtName: "Quân 2",
                        wardCode: "123",
                        wardName: "Xã 123",
                        title: "Nhà Riêng",
                        id: String(Date.now() * Math.random())
                    },
                    {
                        provinceId: 1,
                        provinceName: "Tỉnh 1",
                        districtId: 2,
                        districtName: "Quân 2",
                        wardCode: "123",
                        wardName: "Xã 123",
                        title: "Công Ty",
                        id: String(Date.now() * Math.random())
                    }
                ]
            }
        })

        let result = await prisma.$transaction([newTest, newUser])
        console.log("result", result)

    } catch (err) {
        console.log("lỗi gì rồi!")
    }

    // let allUser = await prisma.users.findMany();

    // let user = await prisma.users.findUnique({
    //     where: {
    //         email: "1@"
    //     }
    // });
})

server.use("/test1", async (req: Request, res: Response) => {

})

import axios from 'axios';
server.use("/authen-google", async (req, res) => {
    let result = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.FB_API_KEY}`, {
        idToken: req.body.token
    })
    console.log("result", result)
})

server.use("/google", (req, res) => {
    res.send("API ok")
})



/* Version api config */
import apiConfig from './apis/index.api'
server.use('/apis', apiConfig)



/* Đẩy server ra port trên máy */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link:  http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
})