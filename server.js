const express = require('express');
// const cors = require('cors');
const mongoose = require('mongoose');
const gamingRouter = require('./route/gamingRoute');
const electronicRouter = require('./route/electronicRoute');
const appliancesRouter = require('./route/appliancesRoute')
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DB_CONNECT, () => console.log('Connected to database!'))
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connecting...'))

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
    res.send({msg:"Welcome to Bongani's Back-end!"});
})

app.use("/appliances", appliancesRouter);
app.use("/electronics", electronicRouter);
app.use("/gaming", gamingRouter)

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));