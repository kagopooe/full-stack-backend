const express = require("express");
const router = express.Router();
const Product = require('../model/Products');
const product = require('../model/Products')
const verify = require("./verifyToken");
const verifyToken = require("./verifyToken");


// getting all products
router.get("/", verify, async (req, res) => {
    try {
        const productsAll = await Product.find()
        res.json(productsAll)
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});
// getting a single product
router.get("/:id", getProduct, verify, (req, res) => {
    res.json(res.product)
});
// adding an appliance
router.post("/", verify, async (req, res) => {
    let { title, category, description, img, price} = req.body
    const product = new Product({
        title,
        category,
        description,
        img,
        price,
        created_by: req.decoded._id
    })
    try {
        const newProduct = await product.save()
        res.status(201).json({ newProduct })
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
});
// update products
router.patch("/:id", verify, getProduct, async (req, res) => {
    let { title, category, description, img, price} = req.body
        try{
            if(req.decoded._id != res.product.created_by) {
                return res.status(401).send({ message: "Unauthorized" })
            }
            if(title) {
                res.product.category = category
            }
            if(description) {
                res.product.description = description
            }
            if(img) {
                res.product.img = img
            }
            if(price) {
                res.product.price = price
            }

            const updatedProduct = await res.product.save()
            res.status(201).json(updatedProduct)
        } catch (err) {
            res.status(400).json({ message: error.message })
        }
});
// removing a product
router.delete("/:id", getProduct, verify, async (req, res) => {
    try {
        if(req.decoded._id != res.product.created_by){
            return res.status(401).send({ message: Unauthorized });
        }
        await res.product.remove()
        res.json({ message: "Product successfully removed"})
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
});

async function getProduct (req,res,next){
    let product
    try {
        product = await Product.findById(req.params.id)
        if(!product) {
            return res.status(404).json({ message: "Cannot find specified product."})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message})
    }
    res.product = product
    next()
}




module.exports = router