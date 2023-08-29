import { NotFoundError } from '../../utils.js'
import { Cart } from './cart.js'
import { ProductManager } from './product.manager.js'
import { FileManager } from './fileManager.js'

export class CartManager {
    constructor (path) {
        this.manager = new FileManager(path)
        this.productManager = ProductManager.getInstance()
    }

    addCart () {
        const cart = new Cart()
        this.manager.updateData([...this.manager.getData(), cart])
        return cart
    }

    getCartById (cid) {
        const cart = this.manager.getData().find(prod => prod.id === cid)
        if (!cart) throw new NotFoundError('Cart Not found')
        return cart
    }

    addProduct (cid, pid) {
        this.productManager.getProductById(pid)
        const cart = this.getCartById(cid)
        const cartUpdated = Cart.update(cart, pid)
        const cartsUpdated = this.manager.getData().map(cart => cart.id !== cid ? cart : cartUpdated)
        this.manager.updateData(cartsUpdated)
        return cartUpdated
    }

    static getInstance () {
        if (!CartManager.instance) {
            CartManager.instance = new CartManager('./src/dao/fileManager/carts.json')
        }
        return CartManager.instance
    }
}
