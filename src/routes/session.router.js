import { Router } from 'express'
import passport from 'passport'
import { SessionManager } from '../dao/dbManager/session.manager.js'
import { SessionController } from '../controller/session.controller.js'

const sessionRouter = Router()
const sessionManager = SessionManager.getInstance()
const sessionController = new SessionController(sessionManager)

sessionRouter.post('/login', sessionController.getUser)
sessionRouter.post('/signup', sessionController.addUser)
sessionRouter.get('/logout', sessionController.destroy)

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res, next) => { })
sessionRouter.get('/gcb', passport.authenticate('github'), async (req, res, next) => {
    req.session.name = req.user.first_name
    req.session.role = 'user'
    res.redirect('/products')
})

export { sessionRouter }
