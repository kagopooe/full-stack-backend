const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const allUsers = require("../model/User")
const User = require("../model/User")
const user = require("../model/User")
const jwt = require('jsonwebtoken')


//get all users
router.get('/', async (req, res) => {
    try {
        const usersAll = await allUsers.find()
        res.json(usersAll)
        } catch (err) {
            res.status(500).json({ message: err.message})
        }
})

//getting one
router.get('/:id', getUser, (req,res) => {
    res.json(res.user)
});

// //encrypt passwords
// const salt = bcrypt.genSalt(10)
// const hashedPassword = bcrypt.hash(req.body.password, salt);

//update user
router.put('/:id', async (req,res) => {
    //encrypt passwords
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const userDetails = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    };
    User.findByIdAndUpdate(req.params.id, { $set:userDetails }, { new: true }, (err, data) => {
        if(!err) {
            res.status(200).json({ code:200, message: "User updated successfully", updateUser: data })
        } else {
            console.log(err);
        }
    });

});

async function getUser(req, res, next) {
    let user
    try {
        user = await allUsers.findById(req.params.id)
        if(user == null) {
            return res.status(404).json({ message: "Cannot find user"})
        }
    } catch(err) {
        return res.status(500).json({ message: err.message})
    }
    res.user = user
    next()


}

module.exports = router