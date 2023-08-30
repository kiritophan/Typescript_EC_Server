import userModel from '../models/user.model'
import { Request, Response } from 'express'

export default {
    find: async function (req: Request, res: Response) {
        await userModel.create()
    }
}