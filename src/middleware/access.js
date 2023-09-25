export const access = (role) => {
    return (req, res, next) => {
        if (req.session.role === role) next()
        return res.status(401).json({ error: 'Unauthorized access' })
    }
}
