import { messageModel } from '../models/message.model.js'

export class MessageManager {
    async getMessages () {
        return await messageModel.find({}).lean()
    }

    async addMessage (data) {
        return await messageModel.create(data)
    }

    static getInstance () {
        if (!MessageManager.instance) MessageManager.instance = new MessageManager()
        return MessageManager.instance
    }
}
