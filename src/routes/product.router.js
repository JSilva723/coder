import { Router } from 'express'
import { ProductManager as ProductDBManager } from '../dao/dbManager/product.manager.js'
import { ProductController } from '../controller/product.controller.js'

const productRouter = Router()
const productManager = ProductDBManager.getInstance()
const productController = new ProductController(productManager)

productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', productController.getProductById)
productRouter.post('/', productController.addProduct)
productRouter.put('/:pid', productController.updateProduct)
productRouter.delete('/:pid', productController.deleteProduct)

export { productRouter }
