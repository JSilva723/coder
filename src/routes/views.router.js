import { Router } from 'express'
import { ProductManager as ProductDBManager } from '../dao/dbManager/product.manager.js'
import { CartManager as CartDBManager } from '../dao/dbManager/cart.manager.js'
import { MessageManager as MessageDBManager } from '../dao/dbManager/message.manager.js'
import { access } from '../middleware/access.js'

const viewsRouter = Router()
const productManager = ProductDBManager.getInstance()
const cartManager = CartDBManager.getInstance()
const messageManager = new MessageDBManager()

viewsRouter.get('/', (req, res) => {
    if (req.session.name) {
        return res.redirect('/products')
    }
    res.render('home', {
        title: 'Home',
        script: 'login.js'
    })
})

viewsRouter.get('/signup', (req, res) => {
    if (req.session.name) {
        return res.redirect('/products')
    }
    res.render('signUp', {
        title: 'Home',
        script: 'signUp.js'
    })
})

viewsRouter.get('/products', async ({ query: { limit, page, category, stock, sort }, session }, res) => {
    if (!session.name) {
        return res.redirect('/')
    }
    const paginate = await productManager.getProducts({ limit, page, category, stock, sort })
    res.render('products', {
        title: 'Products',
        style: 'products.css',
        script: 'cart.js',
        name: session.name,
        role: session.role,
        isValid: paginate.status === 'success',
        payload: paginate.payload,
        totalPages: paginate.totalPages,
        hasPrevPage: paginate.hasPrevPage,
        prevLink: paginate.prevLink,
        page: paginate.page,
        hasNextPage: paginate.hasNextPage,
        nextLink: paginate.nextLink
    })
})

viewsRouter.get('/realtimeproducts', async ({ query: { page }, session }, res) => {
    if (!session.name) {
        return res.redirect('/')
    }
    const paginate = await productManager.getProducts({ page })
    res.render('realTimeProducts', {
        title: 'RealTimeProducts',
        script: 'realTimeProducts.js',
        isValid: paginate.status === 'success',
        payload: paginate.payload,
        totalPages: paginate.totalPages,
        hasPrevPage: paginate.hasPrevPage,
        prevLink: paginate.prevLink,
        page: paginate.page,
        hasNextPage: paginate.hasNextPage,
        nextLink: paginate.nextLink
    })
})

viewsRouter.get('/product-detail/:pid', async ({ params: { pid }, session }, res) => {
    if (!session.name) {
        return res.redirect('/')
    }
    const product = await productManager.getProductById(pid)
    res.render('productDetail', {
        title: 'ProductDetail',
        script: 'cart.js',
        product
    })
})

viewsRouter.get('/carts/:cid', async ({ params: { cid }, session }, res) => {
    if (!session.name) {
        return res.redirect('/')
    }
    const cart = await cartManager.getCartById(cid)
    res.render('carts', {
        title: 'Carts',
        products: cart.products
    })
})

viewsRouter.get('/chat', access('user'), async (_req, res) => {
    const messages = await messageManager.getMessages()
    res.render('chat', {
        title: 'chat',
        script: 'chat.js',
        style: 'chat.css',
        messages
    })
})

export { viewsRouter }
