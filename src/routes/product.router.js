import { Router } from 'express'
import { ProductManager as ProductDBManager } from '../dao/dbManager/product.manager.js'
import { ProductController } from '../controller/product.controller.js'
import { access } from '../middleware/access.js'

const productRouter = Router()
const productManager = ProductDBManager.getInstance()
const productController = new ProductController(productManager)

productRouter.get('/', productController.getProducts)
productRouter.get('/:pid', productController.getProductById)
productRouter.post('/', access('admin'), productController.addProduct)
productRouter.put('/:pid', access('admin'), productController.updateProduct)
productRouter.delete('/:pid', access('admin'), productController.deleteProduct)

export { productRouter }
