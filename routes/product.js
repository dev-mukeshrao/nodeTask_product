const express = require('express')
const Product = require('../models/product')

const router = express.Router()


//create product
router.post('/product', async (req, res) => {

    const product = new Product(req.body)
    console.log(product);
    try {
        
        await product.save()
        console.log(product);
        res.status(201).send({ product })

    } catch (e) {
        
        res.status(500).send(e)
        console.log(e);
    }

})


//update product
router.patch('/product/:id', async (req, res) => {

    const updates = Object.keys(req.body)
    const _id = req.params.id

    try {
        const product = await Product.findByIdAndUpdate(_id)
        if(!product){
            return res.status(404).send({ msg: 'no product found'})
        }

        updates.forEach((update) => product[update] = req.body[update])
        await product.save()

        res.status(200).send(product)
        
    } catch (e) {
        res.status(500).send(e)      
    }

})

//delete product

router.delete('/product/:id',  async (req, res) => {

    const _id = req.params.id

    try {

        const product = await Product.findByIdAndDelete(_id)
        if(!product){
            return res.status(404).send({msg: 'No product found'})
        }
        
        res.status(200).send(product)

    } catch (e) {
        res.status(500).send(e)
    }
})

//filter by product name

router.get('/product/:search', async (req, res) => {
    const _search = req.params.search
    try {
        const product = await Product.find({name: _search})
        if(!product){
            res.status(404).send('no product found')
        }

        res.status(200).send(product)
    } catch (e) {
        res.status(500).send(e)        
    }
})

//filter by product price

router.get('/product/range', async (req, res) => {
    const minPrice = req.query.min
    const maxPrice = req.query.max

    try {
        const product = await Product.find({price:{
            $gte: minPrice,
            $lte: maxPrice
        }})

        if(!product){
            return res.status(404).send({msg: 'No product between range'})
        }

        res.status(200).send(product)
    } catch (e) {
        res.status(500).send(e)
    }
})

//get product by status

router.get('/product/status', async (req, res) => {
    const status = req.query.status

    try {
        const product = await Product.find(({status}))

        if(!product){
            return res.status(404).send({msg: 'no product found'})
        }

        res.status(200).send(product)

    } catch (e) {
        res.status(400).send(e)
    }

})



module.exports = router