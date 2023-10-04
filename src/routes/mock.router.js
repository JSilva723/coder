import { Router } from 'express'
import { ProductManager as ProductMockManager } from '../dao/mockManager/product.manager.js'
import { ProductController } from '../controller/product.controller.js'

const mockRouter = Router()
const productManager = ProductMockManager.getInstance()
const productController = new ProductController(productManager)

mockRouter.get('/', productController.getProducts)
mockRouter.post('/', productController.addProduct)

export { mockRouter }