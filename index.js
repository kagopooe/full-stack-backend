const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
//importing routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts');
const usersRoute = require('./routes/users')
const res = require('express/lib/response');

dotenv.config();



//connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db'),
);

//middleware
app.use(express.json());
//route middleware
app.get('/',(req,res) => {
    res.send({msg: "List of routes:"})
})

// app.get('/api:id', (req,res) )

app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/users', usersRoute)




//route middleware
app.use('/api/user', authRoute);




















const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));