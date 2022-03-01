const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const products = require('./routes/products')
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to database!'))
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connecting...'))

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
    res.send({msg:"Welcome to Bongani and Kago's Back-end!"});
})

app.use("/products", products)
// app.use("/users", users);

const port = process.env.PORT || 3100;
app.listen(port, console.log(`Listening on port ${port}...`));