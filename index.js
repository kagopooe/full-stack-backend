const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
const cors = require('cors');
//importing routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts');
const productsRoute = require('./routes/products')
const usersRoute = require('./routes/users')
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
    res.send({msg: "List of routes: signup - /user/register; login - user/login"})
})

// app.get('/api:id', (req,res) )

app.use('/user', authRoute)
app.use('/posts', postRoute) //private route
app.use('/users', usersRoute)
app.use('/products', productsRoute)




//route middleware
// app.use('/api/user', authRoute);




















const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));