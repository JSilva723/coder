import { eventEmitter } from "../utils.js"

export class ProductController {
    constructor(manager) {
        this.manager = manager
    }

    getProducts = async ({ query: { limit, page, category, stock, sort } }, res, next) => {
        try {
            const paginate = await this.manager.getProducts({ limit, page, category, stock, sort })
            res.json(paginate)
        } catch (err) {
            next(err)
        }
    }

    addProduct = async ({ body }, res, next) => {
        try {
            const product = await this.manager.addProduct(body)
            eventEmitter.emit('update_product', await this.manager.getProducts())
            res.status(201).json({ product })
        } catch (err) {
            next(err)
        }
    }

    getProductById = async ({ params: { pid } }, res, next) => {
        try {
            const product = await this.manager.getProductById(pid)
            res.json({ product })
        } catch (err) {
            next(err)
        }
    }

    updateProduct = async ({ body, params: { pid } }, res, next) => {
        try {
            const product = await this.manager.updateProduct(pid, body)
            res.json({ product })
        } catch (err) {
            next(err)
        }
    }

    deleteProduct = async ({ params: { pid } }, res, next) => {
        try {
            await this.manager.deleteProduct(pid)
            eventEmitter.emit('update_product', await this.manager.getProducts())
            res.status(204).json()
        } catch (err) {
            next(err)
        }
    }
}