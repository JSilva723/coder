import { fileURLToPath } from 'url'
import { dirname } from 'path'
import EventEmitter from 'events'

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
