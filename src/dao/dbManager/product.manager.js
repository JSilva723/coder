import { productModel } from '../models/product.model.js'

export class ProductManager {
    async getProducts ({ limit, page, category, stock, sort }) {
        const query = {}
        if (category) query.category = category
        if (stock && !isNaN(Number(limit))) query.stock = Number(stock)
        const options = {
            lean: true,
            limit: isNaN(Number(limit)) ? 10 : Number(limit),
            page: isNaN(Number(page)) ? 1 : Number(page)
        }
        if (sort && (sort === 'asc' || sort === 'desc')) {
            options.sort = { price: sort === 'asc' ? 1 : -1 }
        }
        const paginate = await productModel.paginate(query, options)
        const isValid = !(page > paginate.totalPages)
        return {
            status: isValid ? 'success' : 'error',
            payload: paginate.docs,
            totalPages: paginate.totalPages,
            prevPage: isValid ? paginate.prevPage : null,
            nextPage: isValid ? paginate.nextPage : null,
            page: paginate.page,
            hasPrevPage: isValid ? paginate.hasPrevPage : null,
            hasNextPage: isValid ? paginate.hasNextPage : null,
            prevLink: isValid && paginate.hasPrevPage ? `http://localhost:8080/products?page=${paginate.prevPage}` : '',
            nextLink: isValid && paginate.hasNextPage ? `http://localhost:8080/products?page=${paginate.nextPage}` : ''
        }
    }

    async addProduct (data) {
        return await productModel.create(data)
    }

    async getProductById (pid) {
        return await productModel.findById(pid).lean()
    }

    async updateProduct (pid, data) {
        const options = { runValidators: true, returnDocument: 'after' }
        return await productModel.findByIdAndUpdate(pid, data, options)
    }

    async deleteProduct (pid) {
        return await productModel.findByIdAndDelete(pid)
    }

    static getInstance () {
        if (!ProductManager.instance) ProductManager.instance = new ProductManager()
        return ProductManager.instance
    }
}
