const express = require("express");
const router = express.Router();
const { getUser } = require("./users");
const verify = require("./verifyToken");
const jwt = require("jsonwebtoken");
const Product = require("../model/Products");
const User = require("../model/User");

//get all items in cart
router.get("/", verify, async (req, res) => {
  res.send({message: req.decoded.cart});
});

//add item to cart
router.post("/:id", verify, async (req, res) => {
  let addProduct = await Product.findById(req.params.id).lean();
  let addUser = await User.findById(req.decoded._id);
  let cart = req.decoded.cart;
  console.log(cart);
  console.log(addProduct);
  let inCart = false;
  try {
    if (!addProduct) {
      return res.status(401).send({ message: "No new product" });
    }
    //check if item is in cart
    cart.forEach((item) => {
      console.log(item._id.valueOf());
      console.log(addProduct._id.valueOf());
      if (item._id.valueOf() == addProduct._id.valueOf()) {
        (inCart = true), (item.qty += req.body.qty), (addUser.cart = cart);
      }
    });
    if (!inCart) {
      cart.push({ ...addProduct, qty: req.body.qty });
      addUser.cart = cart;
    }

    let newUser = {
      _id: addUser.id,
      fullname: addUser.fullname,
      email: addUser.fullname,
      phone_number: addUser.phone_number,
      cart: addUser.cart,
    };

    let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    }); //24 hour expiry
    console.log(cart);
    console.log(addUser.cart);
    const updatedUser = await addUser.save();
    res.status(201).json({ updatedUser, accessToken: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//clear cart
router.delete("/", verify, async (req, res) => {
    let addUser = await User.findById(req.decoded._id);
    try {
    addUser.cart = [];

    let newUser = {
      _id: addUser._id,
      fullname: addUser.fullname,
      email: addUser.email,
      phone_number: addUser.phone_number,
      cart: addUser.cart,
    };
    let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    });

    await addUser.save();
    res.json({ message: "Cart cleared", accessToken: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//remove cart item
router.patch("/:id", verify, async (req, res) => {
let addUser = await User.findById(req.decoded._id);
  let cart = req.decoded.cart;
  cart.forEach((item) => {
    console.log(item.id);
    console.log(req.params.id);
    if (item.id == req.params.id) {
      cart = cart.filter((cartItem) => cartItem.id != req.params.id);
    }
  });
  try {
    addUser.cart = cart;

    let newUser = {
      _id: addUser._id,
      fullname: addUser.fullname,
      email: addUser.email,
      phone_number: addUser.phone_number,
      cart: addUser.cart,
    };
    let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    });
    const updatedCart = await addUser.save();

    res.json({
      message: "Item removed successfully",
      updatedCart,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//change quantity of items
router.put("/:id", verify, async (req, res) => {
let addUser = await User.findById(req.decoded._id);
  let product = await Product.findById(req.params.id).lean();
  let cart = req.decoded.cart;
  try {
    cart.forEach((item) => {
      if (item._id.valueOf() == product._id.valueOf()) {
        item.qty = req.body.qty;
        addUser.cart = cart;
      }
    });
    const updatedUser = await addUser.save();

    let newUser = {
      _id: addUser._id,
      fullname: addUser.fullname,
      email: addUser.email,
      phone_number: addUser.phone_number,
      cart: addUser.cart,
    };
    let token = jwt.sign(newUser, process.env.TOKEN_SECRET, {
      expiresIn: 86400,
    });
    res.status(201).json({ updatedUser, accessToken: token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
