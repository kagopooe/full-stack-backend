const express = require('express')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');
//importing routes
const authRoute = require('./routes/auth')

dotenv.config();



//connect to db
mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to db')
);

//middleware
app.use(express.json());
//route middleware
app.use('/api/user', authRoute)




//route middleware
app.use('/api/user', authRoute);




















const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));