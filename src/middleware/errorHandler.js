export const errorHandler = (err, _req, res, _next) => {
    if (err.statusCode) {
        return res.status(err.statusCode).send({ error: [err.message] })
    }
    if (err.code === 11000) {
        return res.status(400).json({ error: ["There's a product with code: " + err.keyValue.code] })
    }
    if (err._message === 'products validation failed') {
        const msg = []
        for (const key in err.errors) {
            msg.push(err.errors[key].message)
        }
        return res.status(400).json({ error: msg })
    }
    if (err.path === '_id') {
        const msg = `The id ${err.value} is not valid. ${err.reason}`
        return res.status(400).json({ error: msg })
    }
    console.error(err) // eslint-disable-line no-console
    res.status(500).json({ error: ['Internal error'] })
}
