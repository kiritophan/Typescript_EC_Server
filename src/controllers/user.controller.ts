import userModel, { NewUser, Address } from '../models/user.model'
import { Request, Response } from 'express'
import Text from '../text'
import jwt from '../services/jwt'
import mail, { templates } from "../services/mail";
import bcrypt from 'bcrypt'

export default {
    register: async function (req: Request, res: Response) {
        /* Hash Password : Băm mật khẩu*/
        req.body.password = await bcrypt.hash(req.body.password, 10);
        try {

            let newUser: NewUser = {
                ...req.body,
                createAt: new Date(Date.now()),
                updateAt: new Date(Date.now()),
            }
            console.log("new User 2", newUser);

            let modelRes = await userModel.register(newUser);

            /* Mail */
            if (modelRes.status) {
                mail.sendMail({
                    to: `${modelRes.data?.email}`,
                    subject: "Xác thực email",
                    html: templates.emailConfirm({
                        confirmLink: `${process.env.SERVER_URL}auth/email-confirm/${jwt.createToken(modelRes.data, "300000")}`,
                        language: String(req.headers.language),
                        productName: "ASTO Store",
                        productWebUrl: "rikkeisoft.com",
                        receiverName: modelRes.data?.firstName + '' + modelRes.data?.lastName
                    })
                })
            }
            modelRes.message = (Text(String(req.headers.language)) as any)[modelRes.message];

            return res.status(modelRes.status ? 200 : 213).json(modelRes);
        } catch (err) {

            return res.status(500).json({
                // message: "Loi controller"
                message: Text(String(req.headers.language)).controllerErr,
            })
        }
    },
    login: async function (req: Request, res: Response) {
        try {
            let modelRes = await userModel.inforByUserName(req.body.userName);
            if (modelRes.status) {
                if (!modelRes.data?.isActive) {
                    return res.status(modelRes.status ? 200 : 213).json({
                        message: "Tai khoan dang bi tam khoa"
                    });
                }
                let checkPassword = await bcrypt.compare(req.body.password, modelRes.data.password);
                if (!checkPassword) {
                    return res.status(213).json({
                        message: "Mật khẩu không chính xác"
                    });
                }
                return res.status(200).json({
                    message: "Đăng nhập thành công",
                    token: jwt.createToken(modelRes.data, "1d")
                });
            }


            return res.status(modelRes.status ? 200 : 213).json({
                message: "Nguoi dung khong ton tai"
            });
        } catch (err) {

            return res.status(500).json({
                // message: "Loi controller"
                message: Text(String(req.headers.language)).controllerErr,
            })
        }
    }
}