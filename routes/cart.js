const express = require('express')
const router = express.Router()
const { getUser } = require('./users')
const verify = require("./verifyToken")
const jwt = require('jsonwebtoken')
const Product = require('../model/Products')

//get all items in cart
router.get("/", verify, getUser, async (req,res) => {
    res.send(req.decoded.cart)
})

//add item to cart
router.post('/:id', verify, getUser, async (req,res) => {
    let addProduct = await Product.findById(req.params.findById).lean()

    let cart = req.decoded.cart
    console.log(cart);
    console.log(addProduct);
    let inCart = false
    try {
        if(!addProduct) {
            return res.status(401).send({ message: "No new product"});
        }
        //check if item is in cart
        cart.forEach(item => {
            console.log(item.id.valueOf());
            console.log(addProduct.id.valueOf());
            if(item.id.valueOf() == addProduct.id.valueOf()){
                inCart = true,
                item.qty += req.body.qty,
                res.user.cart = cart
            }
        });
        if(!inCart){
            cart.push({...addProduct, qty: req.body.qty})
            res.user.cart = cart
        }

        const updatedUser = await res.user.save()

        let newUser = {
            _id: res.user.id,
            fullname: res.user.fullname,
            email: res.user.fullname,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }

        let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {expiresIn: 86400}); //24 hour expiry
        console.log(cart);
        console.log(res.user.cart);
        res.status(201).json({ updatedUser, accessToken: token})
    } catch(err) {
        res.status(500).json({ message: err.message})
    }
});

//clear cart
router.delete('/', verify, getUser, async (req,res) => {
    try {
        res.user.cart = [];

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }
        let token = jwt.sign( newUser, process.env.TOKEN_SECRET, {expiresIn: 86400});

        await res.user.save()
        res.json({ message: "Cart cleared", accessToken: token})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

//remove cart item
router.patch('/:id', verify, getUser, async (req,res) => {
    let cart = req.decoded.cart
    cart.forEach((item) => {
        console.log(item.id);
        console.log(reqq.params.id);
        if(item.id == req.params.id) {
            cart = cart.filter(cartItem => cartItem.id != req.params.id)
        }
    })
    try {
        res.user.cart = cart

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }
        let token = jwt.sign( newUser, process.env.TOKEN_SECRET, {expiresIn: 86400});
        const updatedCart = await res.user.save()

        res.json({ message: 'Item removed successfully', updatedCart, accessToken: token})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

//change quantity of items
router.put('/:id', verify, getUser, async (req,res) => {
    let product = await Product.findById(req.params.id).lean()
    let cart = req.decoded.cart
    try {
        cart.forEach(item => {
            if(item._id.valueOf() == product._id.valueOf()){
                item.qty = req.body.qty
                res.user.cart = cart
            }
        });
        const updatedUser = await res.user.save()

        let newUser = {
            _id: res.user._id,
            fullname: res.user.fullname,
            email: res.user.email,
            phone_number: res.user.phone_number,
            cart: res.user.cart
        }
        let token = jwt.sign( newUser, process.env.TOKEN_SECRET, {expiresIn: 86400});
        res.status(201).json({ updatedUser, accessToken: token})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})