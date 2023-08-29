import mongoose, { Schema } from 'mongoose'
import { BadRequestError } from '../../utils.js'
import { productCollection } from './product.model.js'

export const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: productCollection
                },
                quantity: Number
            }
        ]
    }
}, {
    methods: {
        async addProduct (pid) {
            const existProduct = await mongoose.model(productCollection).findById(pid)
            if (!existProduct) throw new BadRequestError(`The Product with id ${pid} not exist`)
            const idx = this.products.findIndex(item => item.product.equals(pid))
            if (idx === -1) {
                this.products.push({ product: pid, quantity: 1 })
            } else {
                this.products[idx].quantity += 1
            }
            this.markModified('products')
            await this.save()
        },
        async deleteProduct (pid) {
            const existProduct = await mongoose.model(productCollection).findById(pid)
            if (!existProduct) throw new BadRequestError(`The Product with id ${pid} not exist`)
            const filteredProducts = this.products.filter(item => !item.product.equals(pid))
            this.products = filteredProducts
            this.markModified('products')
            await this.save()
        },
        async updateProducts (products) {
            if (products.length !== 0) {
                let idx = 0
                while (idx < products.length) {
                    if (!products[idx].quantity || products[idx].quantity < 0) {
                        throw new BadRequestError('Quantity is required and must be more than zero')
                    }
                    const existProduct = await mongoose.model(productCollection).findById(products[idx].product)
                    if (!existProduct) throw new BadRequestError(`The Product with id ${products[idx].product} not exist`)
                    idx++
                }
            }
            this.products = products
            this.markModified('products')
            await this.save()
        },
        async updateQuantity (pid, quantity) {
            const idx = this.products.findIndex(item => item.product.equals(pid))
            if (idx === -1) throw new BadRequestError(`The Product with id ${this.products[idx].product} not exist`)
            this.products[idx].quantity = quantity
            this.markModified('products')
            await this.save()
        }
    }
})

export const cartModel = mongoose.model(cartCollection, cartSchema)
