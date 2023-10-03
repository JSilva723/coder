import { NotFoundError } from '../../utils.js'
import { genProducts } from './products.js'
import { Product } from '../fileManager/product.js'

export class ProductManager {
    constructor (products) {
        this.products = products
    }

    async getProducts ({limit}) {
        const _limit = limit || 50
        if (!isNaN(Number(_limit)) && _limit > 0) {
            return this.products.slice(0, _limit)
        }
    }

    async addProduct (data) {
        const product = new Product(data)
        const existProduct = this.products.find(prod => prod.code === product.code)
        if (existProduct) throw new NotFoundError("There's a product with code: " + product.code)
        this.products.push(product)
        return product
    }

    static getInstance () {
        if (!ProductManager.instance) {
            ProductManager.instance = new ProductManager(genProducts(100))
        }
        return ProductManager.instance
    }
}