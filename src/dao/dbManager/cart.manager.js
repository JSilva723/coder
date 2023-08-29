import { cartModel } from '../models/cart.model.js'
import { BadRequestError } from '../../utils.js'

export class CartManager {
    async addCart () {
        return await cartModel.create({})
    }

    async getCartById (cid) {
        return await cartModel.findById(cid).populate('products.product').lean()
    }

    async addProduct (cid, pid) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new BadRequestError(`The Cart whit id ${cid} not exist`)
        await cart.addProduct(pid)
        return cart
    }

    async deleteProduct (cid, pid) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new BadRequestError(`The Cart whit id ${cid} not exist`)
        await cart.deleteProduct(pid)
        return cart
    }

    async updateProducts (cid, products) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new BadRequestError(`The Cart whit id ${cid} not exist`)
        await cart.updateProducts(products)
        return cart
    }

    async updateQuantity (cid, pid, quantity) {
        const cart = await cartModel.findById(cid)
        if (!cart) throw new BadRequestError(`The Cart whit id ${cid} not exist`)
        await cart.updateQuantity(pid, quantity)
        return cart
    }

    static getInstance () {
        if (!CartManager.instance) CartManager.instance = new CartManager()
        return CartManager.instance
    }
}
