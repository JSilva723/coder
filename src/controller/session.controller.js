export class SessionController {
    constructor(manager) {
        this.manager = manager
    }

    getUser = async (req, res, next) => {
        const { email, password } = req.body
        if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
            req.session.name = 'adminCoder'
            req.session.role = 'admin'
            return res.status(200).json({ status: 'succes' })
        }
        try {
            const user = await sessionManager.getUser({ email, password })
            if (user) {
                req.session.name = user.first_name
                req.session.role = 'user'
                return res.status(200).json({ status: 'succes' })
            }
        } catch (err) { next(err) }
    }

    addUser = async (req, res, next) => {
        const { email, password, firstName, lastName, age } = req.body
        try {
            const user = await sessionManager.addUser({ email, password, first_name: firstName, last_name: lastName, age })
            req.session.name = user.first_name
            req.session.role = 'user'
            return res.status(201).json({ status: 'succes' })
        } catch (err) { next(err) }
    }

    destroy = async (req, res, next) => {
        req.session.destroy(err => {
            if (err) return res.status(500).json({ status: 'error', body: err })
            return res.json({ status: 'ok' })
        })
    }
}