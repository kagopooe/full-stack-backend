const bcrypt = require('bcryptjs/dist/bcrypt');
const res = require('express/lib/response');
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')


router.post('/register', async (req,res) => {
    //user validation

const {error} = registerValidation(req.body)
if(error) return res.status(400).send({message: error.details[0].message});

//checking if user already exists
const emailExist = await User.findOne({email: req.body.email});
if (emailExist) return res.status(400).send({message: 'Email already exists'});

//encrypt passwords
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password, salt);


//create a new user
const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: hashedPassword
});
    try {
        const savedUser = await user.save();
        res.send({ user: user._id})
    }catch(err) {
        res.status(400).send({message:err});
    }
});

//login
router.post('/login', async (req, res) => {
//user validation
// const {error} = schema.validate(req.body);
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).send({message: error.details[0].message});
    //checking if email already exists
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send({message:'Incorrect email or password'});

    //is password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send({message: 'Invalid password'})
    
    //create and assign token - login token used in front-end
    const token = jwt.sign({_id: user._id, cart: user.cart}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send({message: token})

    



});






module.exports = router