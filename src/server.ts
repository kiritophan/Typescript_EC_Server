/* Load file .env */
import dotenv from 'dotenv'
dotenv.config();

import express from 'express'

/* Tạo ra server */

const server = express();

server.use('/test', (req, res) => {
    return res.send("Oke Server")
})
/* Đẩy server ra port trên máy */

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server on link:  http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/`)
})