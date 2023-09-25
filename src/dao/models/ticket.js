import mongoose from 'mongoose'
import { uuidv4 } from '../../utils'

export const ticketCollection = 'tickets'

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        default: () => uuidv4()
    },
    amount: {
        type: Number
    },
    purchaser: {
        type: String
    },
}, { timestamps: true })

export const ticketModel = mongoose.model(ticketCollection, ticketSchema)