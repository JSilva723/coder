import { Router } from 'express'
import { ProductManager as ProductDBManager } from '../dao/dbManager/product.manager.js'
import { eventEmitter } from '../utils.js'

const productRouter = Router()
const productManager = ProductDBManager.getInstance()

productRouter.get('/', async ({ query: { limit, page, category, stock, sort } }, res, next) => {
    try {
        const paginate = await productManager.getProducts({ limit, page, category, stock, sort })
        res.json(paginate)
    } catch (err) {
        next(err)
    }
})

productRouter.get('/:pid', async ({ params: { pid } }, res, next) => {
    try {
        const product = await productManager.getProductById(pid)
        res.json({ product })
    } catch (err) {
        next(err)
    }
})

productRouter.post('/', async ({ body }, res, next) => {
    try {
        const product = await productManager.addProduct(body)
        eventEmitter.emit('update_product', await productManager.getProducts())
        res.status(201).json({ product })
    } catch (err) {
        next(err)
    }
})

productRouter.put('/:pid', async ({ body, params: { pid } }, res, next) => {
    try {
        const product = await productManager.updateProduct(pid, body)
        res.json({ product })
    } catch (err) {
        next(err)
    }
})

productRouter.delete('/:pid', async ({ params: { pid } }, res, next) => {
    try {
        await productManager.deleteProduct(pid)
        eventEmitter.emit('update_product', await productManager.getProducts())
        res.status(204).json()
    } catch (err) {
        next(err)
    }
})

export { productRouter }
