import Router from 'koa-router'

import * as auth from '../controllers/auth'

const router = new Router()

router.post('/auth/register', auth.register)
router.post('/auth/login', auth.login)
router.get('/auth/info', auth.info)

export default router