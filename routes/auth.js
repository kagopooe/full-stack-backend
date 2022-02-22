const res = require('express/lib/response');

const router = require('express').Router();

router.post('/register', (req,res) => {
    res.send('Register')
})






module.exports = router;