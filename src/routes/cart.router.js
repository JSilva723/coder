import { Router } from 'express'
import { CartManager as CartDBManager } from '../dao/dbManager/cart.manager.js'
import { CartController } from '../controller/cart.controller.js'
import { access } from '../middleware/access.js'

const cartRouter = Router()
const cartManager = CartDBManager.getInstance()
const cartController = new CartController(cartManager)

cartRouter.post('/', cartController.addCart)
cartRouter.get('/:cid', cartController.getCartById)
cartRouter.post('/:cid/product/:pid', access('user'), cartController.addProduct)
cartRouter.delete('/:cid/products/:pid', access('user'), cartController.deleteProduct)
cartRouter.put('/:cid', cartController.updateProducts)
cartRouter.put('/:cid/products/:pid', cartController.updateQuantity)
cartRouter.delete('/:cid', cartController.updateProducts)

export { cartRouter }
