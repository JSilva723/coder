import { sendMail } from '../utils.js'

export class CartController {
    constructor (manager) {
        this.manager = manager
    }

    addCart = async (req, res, next) => {
        try {
            if (!req.session.cid) {
                const cart = await this.manager.addCart()
                req.session.cid = cart._id
                return res.send({ cid: req.session.cid })
            }
            return res.send({ cid: req.session.cid })
        } catch (err) { next(err) }
    }

    getCartById = async ({ params: { cid } }, res, next) => {
        try {
            const cart = await this.manager.getCartById(cid)
            res.send(cart)
        } catch (err) { next(err) }
    }

    addProduct = async ({ params: { cid, pid } }, res, next) => {
        try {
            const cart = await this.manager.addProduct(cid, pid)
            res.send(cart)
        } catch (err) { next(err) }
    }

    deleteProduct = async ({ params: { cid, pid } }, res, next) => {
        try {
            const cart = await this.manager.deleteProduct(cid, pid)
            res.send(cart)
        } catch (err) { next(err) }
    }

    updateProducts = async ({ params: { cid }, body: { products } }, res, next) => {
        try {
            const cart = await this.manager.updateProducts(cid, products)
            res.send(cart)
        } catch (err) { next(err) }
    }

    updateQuantity = async ({ params: { cid, pid }, body: { quantity } }, res, next) => {
        try {
            const cart = await this.manager.updateQuantity(cid, pid, quantity)
            res.send(cart)
        } catch (err) { next(err) }
    }

    purchase = async ({ params: { cid }, session: { name } }, res, next) => {
        try {
            const purchased = await this.manager.purchase(cid, name)
            await sendMail(purchased.ticket)
            res.send({
                unprocessed: purchased.unprocessed,
                success: `Send emal to ${purchased.ticket.purchaser}`
            })
        } catch (err) { next(err) }
    }
}
