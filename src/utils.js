import { fileURLToPath } from 'url'
import { dirname } from 'path'
import EventEmitter from 'events'
import nodemailer from 'nodemailer'
import winston from 'winston'
import { env } from './config/env.js'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

export function uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}

export class NotFoundError extends Error {
    constructor (message) {
        super(message)
        this.statusCode = 404
    }
}

export class BadRequestError extends Error {
    constructor (message) {
        super(message)
        this.statusCode = 400
    }
}

export const eventEmitter = new EventEmitter()

const transport = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
})

export const sendMail = async (ticket) => {
    await transport.sendMail({
        from: `Test <${env.EMAIL_USER}>`,
        to: ticket.purchaser,
        subject: 'Test - compra',
        html: `
        <div>
            <h1>Total: ${ticket.amount}</h1>
            <p>Código: ${ticket.code}</p>
        </div>
        `
    })
}

const logOptions = {
    levels: {
        debug: 5, 
        http: 4, 
        info: 3,
        warning: 2, 
        error: 1, 
        fatal: 0
    },
    colors: {
        debug: 'white', 
        http: 'green', 
        info: 'blue',
        warning: 'yellow', 
        error: 'grey', 
        fatal: 'red'
    }
}

export const logger = winston.createLogger({
    levels: logOptions.levels,
});

if(env.NODE_ENV === 'production'){
    const console = new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({ colors: logOptions.colors }),
            winston.format.simple(),
        )
    })
    const file = new winston.transports.File({
        filename: './errors.log',
        level: 'warning',
        format:  winston.format.simple()
    })
    logger.add(file)
    logger.add(console)
}else{
    const console = new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({ colors: logOptions.colors }),
            winston.format.simple(),
        )
    })
    logger.add(console)
}


