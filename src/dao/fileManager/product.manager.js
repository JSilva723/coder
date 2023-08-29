import { NotFoundError } from '../../utils.js'
import { Product } from './product.js'
import { FileManager } from './fileManager.js'

export class ProductManager {
    constructor (path) {
        this.manager = new FileManager(path)
    }

    getProducts (limit) {
        const products = this.manager.getData()
        if (!isNaN(Number(limit)) && limit > 0) {
            return products.slice(0, limit)
        }
        return products
    }

    addProduct (data) {
        const product = new Product(data)
        const existProduct = this.getProducts().find(prod => prod.code === product.code)
        if (existProduct) throw new NotFoundError("There's a product with code: " + product.code)
        this.manager.updateData([...this.getProducts(), product])
        return product
    }

    getProductById (id) {
        const product = this.getProducts().find(prod => prod.id === id)
        if (!product) throw new NotFoundError('Product Not found')
        return product
    }

    updateProduct (id, data) {
        const products = this.getProducts()
        const product = this.getProductById(id)
        if (!product) throw new NotFoundError('Product Not found')
        const productUpdated = Product.update(product, data)
        const productsUpdated = products.map(product => product.id !== id ? product : productUpdated)
        this.manager.updateData(productsUpdated)
        return productUpdated
    }

    deleteProduct (id) {
        const productsUpdated = this.getProducts().filter(product => product.id !== id)
        if (productsUpdated.length === this.getProducts().length) throw new NotFoundError('Product Not found')
        this.manager.updateData(productsUpdated)
        return null
    }

    static getInstance () {
        if (!ProductManager.instance) {
            ProductManager.instance = new ProductManager('./src/dao/fileManager/products.json')
        }
        return ProductManager.instance
    }
}
