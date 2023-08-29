import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

export const productCollection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title is required']
    },
    description: {
        type: String,
        required: [true, 'The description is required']
    },
    code: {
        type: String,
        required: [true, 'The code is required'],
        unique: true
    },
    price: {
        type: Number,
        required: [true, 'The price is required']
    },
    status: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [true, 'The stock is required']
    },
    category: {
        type: String,
        required: [true, 'The category is required']
    },
    thumbnails: {
        type: [String],
        default: []
    }
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection, productSchema)
