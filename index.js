const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
//importing routes
const authRoute = require('./routes/auth')
const productsRoute = require('./routes/products')
const usersRoute = require('./routes/users')
const cartRoute = require('./routes/cart')
const res = require('express/lib/response');

dotenv.config();



//connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'),
);

//middleware
app.use(express.json());
app.use(cors());
//route middleware
app.get('/',(req,res) => {
    res.send(
        {msg: "register - POST user/register, login- POST user/login, get all users - GET /users, get single user - GET /users/:id, update user - PUT /users/:id, delete user - DELETE /users/:id, products - GET /products, single product - GET /products/:id, add product - POST /products, update product - PATCH /products/:id, remove product - DELETE /products/:id, get items in cart - GET /cart, add to cart - POST /cart, clear cart - DELETE /cart, remove item in cart - PATCH /cart/:id, change item qty in cart - PUT /cart/:id  "})
})

// route middleware
app.use('/user', authRoute)
app.use('/users', usersRoute)
app.use('/products', productsRoute)
app.use('/user/cart', cartRoute)








const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));