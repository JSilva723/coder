import { Router } from 'express'
import { logger } from '../utils.js'

const logTestRouter = Router()

logTestRouter.get('/', (_req, res) => {
    logger.log('debug', 'message debug')
    logger.log('http', 'message http')
    logger.log('info', 'message info')
    logger.log('warning', 'message warning')
    logger.log('error', 'message error')
    logger.log('fatal', 'message fatal')
    res.json({msg: 'Test logger'})
})

export { logTestRouter }