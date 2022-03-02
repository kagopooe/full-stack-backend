const res = require('express/lib/response');
const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req,res) => {
    res.send(req.user)

});

//check to make sure header is not undefined
//  const  checkToken = (req, res, next) => {

//  }


module.exports = router;