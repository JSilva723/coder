import { BadRequestError, uuidv4 } from '../../utils.js'

const OBJ_TYPE = {
    title: 'string',
    description: 'string',
    code: 'string',
    price: 'number',
    stock: 'number',
    category: 'string'
}

const isValid = (key, value) => {
    if (key === 'status') {
        if (value === null || value === undefined) return true
        if (typeof value !== 'boolean') throw new BadRequestError('The status must be a boolean')
        return value
    }
    if (key === 'thumbnails') {
        if (value === null || value === undefined) return null
        if (!Array.isArray(value) || value.length === 0 || !value.every(url => typeof url === 'string')) throw new BadRequestError('The thumbnails must be a array of strings')
        return value
    }
    if (!value) throw new BadRequestError(`The ${key} is required`)
    // eslint-disable-next-line valid-typeof
    if (typeof value !== OBJ_TYPE[key]) throw new BadRequestError(`The ${key} must be a ${OBJ_TYPE[key]}`)
    return value
}

export class Product {
    constructor (data) {
        const { title, description, code, price, status, stock, category, thumbnails } = data
        this.id = uuidv4()
        this.title = this.#validate({ title })
        this.description = this.#validate({ description })
        this.code = this.#validate({ code })
        this.price = this.#validate({ price })
        this.status = this.#validate({ status })
        this.stock = this.#validate({ stock })
        this.category = this.#validate({ category })
        this.thumbnails = this.#validate({ thumbnails })
    }

    #validate (obj) {
        const [key, value] = Object.entries(obj)[0]
        return isValid(key, value)
    }

    static update (prod, data) {
        for (const key in data) {
            if (prod.hasOwnProperty(key)) { // eslint-disable-line no-prototype-builtins
                if (key === 'id') throw new BadRequestError('The id cannot be modified')
                prod[key] = isValid(key, data[key])
            }
        }
        return prod
    }
}
