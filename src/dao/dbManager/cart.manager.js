import { cartModel } from '../models/cart.model.js'
import { productModel } from '../models/product.model.js'
import { userModel } from '../models/user.model.js'
import { ticketModel } from '../models/ticket.model.js'
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

    async purchase (cid, name) {
        const unprocessed = []
        let amount = 0
        const cart = await cartModel.findById(cid).populate('products.product').lean()
        if (!cart) throw new BadRequestError(`The Cart whit id ${cid} not exist`)
        for await (const p of cart.products) {
            if (p.product.stock > p.quantity) {
                productModel.findByIdAndUpdate(p.product._id, { stock: p.product.stock - p.quantity })
                amount += p.quantity * p.product.price
            } else {
                unprocessed.push(p.product)
            }
        }
        const user = await userModel.findOne({ first_name: name })
        const ticket = await ticketModel.create({
            amount,
            purchaser: user.email
        })
        return {
            ticket,
            unprocessed
        }
    }

    static getInstance () {
        if (!CartManager.instance) CartManager.instance = new CartManager()
        return CartManager.instance
    }
}
