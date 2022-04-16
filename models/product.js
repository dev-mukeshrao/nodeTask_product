const mongoose = require('mongoose')
const validator = require('validator')



//create schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'PLease provide product name']
    },
    description: {
        type: String,
        maxlength: 250
    },
    price: {
        type: Number,
        required: true        
    },
    qty: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product