import express from 'express'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { engine } from 'express-handlebars'
import cors from 'cors'
import mongoose from 'mongoose'
import { Server as WebSocketServer } from 'socket.io'
import passport from 'passport'
import { env } from './config/env.js'
import { __dirname, eventEmitter } from './utils.js'
import { sessionRouter } from './routes/session.router.js'
import { productRouter } from './routes/product.router.js'
import { cartRouter } from './routes/cart.router.js'
import { viewsRouter } from './routes/views.router.js'
import { errorHandler } from './middleware/errorHandler.js'
import { initializePassport } from './config/passport.config.js'
import { mockRouter } from './routes/mock.router.js'
import { logTestRouter } from './routes/logTest.router.js'
import { logger } from './utils.js'

const PORT = env.PORT
const MONGO_URI = env.MONGO_URI

const app = express()
initializePassport()
app.use(passport.initialize())
app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI
    }),
    secret: 'coderSecret',
    resave: true,
    saveUninitialized: true
}))
app.use(cors())
app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')
app.use(express.static(__dirname + '/public'))

app.use(viewsRouter)
app.use('/api/session', sessionRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/mockingproducts', mockRouter)
app.use('/api/loggerTest', logTestRouter)
app.use('/api/*', (_req, res) => res.status(404).json({ error: 'Endpoint not found' }))
app.use('/*', (_req, res) => res.redirect('/'))
app.use(errorHandler)

async function main () {
    await mongoose.connect(MONGO_URI)
    logger.log('info','Conected with DB')
    const httpServer = app.listen(PORT, () => {
        logger.log('info', `Your server listen in port: ${PORT}`)
    })
    const webSocketServer = new WebSocketServer(httpServer)
    webSocketServer.on('connection', () => {
        logger.log('info', 'Cliente conectado') 
    })
    eventEmitter.on('update_product', function (products) {
        webSocketServer.sockets.emit('products', products)
    })
}

main().catch((err) => logger.log('fatal', err))

