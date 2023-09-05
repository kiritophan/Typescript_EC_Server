/* Load file .env */
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'

/* Tạo ra server */

const server = express();


import cors from 'cors'
server.use(cors());

/* Setup body parser */

import bodyParser from 'body-parser';
server.use(bodyParser.json())

import MailServer, { templates } from './services/mail'

server.use("/test", async (req, res) => {
    console.log("String(req.headers.language)", String(req.headers.language));

    let result = await MailServer.sendMail({
        to: "phanvandau1510@gmail.com",
        subject: "Thu nghiem templates",
        html: templates.emailConfirm({
            productName: 'Top top store',
            productWebUrl: 'https://pokemoninmylife.com/',
            receiverName: 'Welcome to Mail Ms',
            confirmLink: 'rikkeisoft.com',
            language: String(req.headers.language)
        })

    })
    console.log("Result", result)
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
import apiConfig from './routes'
import guard from './middlewares/guard'
server.use('/apis', guard.ipAuthen, apiConfig)

/* Đẩy server ra port trên máy */
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link:  http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
})