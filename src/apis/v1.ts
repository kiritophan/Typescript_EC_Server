import express from 'express'
const router = express.Router();

import userApi from '../apis/modules/user.api'

router.use('/users', userApi);

export default router;