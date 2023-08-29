import { uuidv4 } from '../../utils.js'

export class Cart {
    constructor () {
        this.id = uuidv4()
        this.products = []
    }

    static update (cart, pid) {
        const { products } = cart
        const idx = products.findIndex(product => product.product === pid)
        if (idx === -1) {
            cart.products.push({ product: pid, quantity: 1 })
        } else {
            cart.products[idx].quantity += 1
        }
        return cart
    }
}
