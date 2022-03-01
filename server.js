const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const productsRouter = require('./routes/productsRouter')
require('dotenv').config();

const app = express();

// let corsOptions = {
//     origin: 'https://localhost:8080'
// }

mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to database!'))
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connecting...'))

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({msg:"Welcome to Bongani and Kago's Back-end!"});
})

// app.get("/products", (req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', 'https://localhost:8080')
//     res.send("products")
// })

app.use("/products", productsRouter)
// app.use("/users", users);

const port = process.env.PORT || 8081;
app.listen(port, console.log(`Listening on port ${port}...`));