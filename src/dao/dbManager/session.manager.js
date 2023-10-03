import { BadRequestError, NotFoundError } from '../../utils.js'
import { userModel } from '../models/user.model.js'

export class SessionManager {
    async addUser (data) {
        return await userModel.create(data)
    }

    async getUser ({ email, password }) {
        const user = await userModel.findOne({ email })
        if (!user) throw new NotFoundError('User not exist')
        if (!(await user.match(password))) throw new BadRequestError('The pass is incorret')
        return user
    }

    async getUserById (id) {
        return await userModel.findById(id)
    }

    static getInstance () {
        if (!SessionManager.instance) SessionManager.instance = new SessionManager()
        return SessionManager.instance
    }
}
