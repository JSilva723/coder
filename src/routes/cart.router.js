import { Router } from 'express'
import { CartManager as CartDBManager } from '../dao/dbManager/cart.manager.js'

const cartRouter = Router()
const cartManager = CartDBManager.getInstance()

cartRouter.post('/', async (req, res, next) => {
    try {
        if (!req.session.cid) {
            const cart = await cartManager.addCart()
            req.session.cid = cart._id
            return res.send({ cid: req.session.cid })
        }
        return res.send({ cid: req.session.cid })
    } catch (err) { next(err) }
})

cartRouter.get('/:cid', async ({ params: { cid } }, res, next) => {
    try {
        const cart = await cartManager.getCartById(cid)
        res.send(cart)
    } catch (err) { next(err) }
})

cartRouter.post('/:cid/product/:pid', async ({ params: { cid, pid } }, res, next) => {
    try {
        const cart = await cartManager.addProduct(cid, pid)
        res.send(cart)
    } catch (err) { next(err) }
})

cartRouter.delete('/:cid/products/:pid', async ({ params: { cid, pid } }, res, next) => {
    try {
        const cart = await cartManager.deleteProduct(cid, pid)
        res.send(cart)
    } catch (err) { next(err) }
})

cartRouter.put('/:cid', async ({ params: { cid }, body: { products } }, res, next) => {
    try {
        const cart = await cartManager.updateProducts(cid, products)
        res.send(cart)
    } catch (err) { next(err) }
})

cartRouter.put('/:cid/products/:pid', async ({ params: { cid, pid }, body: { quantity } }, res, next) => {
    try {
        const cart = await cartManager.updateQuantity(cid, pid, quantity)
        res.send(cart)
    } catch (err) { next(err) }
})

cartRouter.delete('/:cid', async ({ params: { cid } }, res, next) => {
    try {
        const cart = await cartManager.updateProducts(cid, [])
        res.send(cart)
    } catch (err) { next(err) }
})

export { cartRouter }
