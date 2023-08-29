import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userCollection = 'users'
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'The first name is required']
    },
    last_name: {
        type: String,
        required: [true, 'The last name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'The age is required'],
        min: [0, 'The age must be more than zero']
    },
    password: {
        type: String
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

userSchema.methods.match = function (pass) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(pass, this.password, function (err, isMatch) {
            if (err) return reject(err)
            resolve(isMatch)
        })
    })
}

export const userModel = mongoose.model(userCollection, userSchema)
