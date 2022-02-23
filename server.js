const express = require('express');
const cors = require('cors');
const gamingRouter = require('./route/gamingRoute');
const electronicRouter = require('./route/electronicRoute');
const appliancesRouter = require('./route/appliancesRoute')

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send({msg:"Welcome to Bongani's Back-end!"});
})

app.use("/appliances", appliancesRouter);
app.use("/electronics", electronicRouter);
app.use("/gaming", gamingRouter)

const port = process.env.PORT || 3000;
app.listen(port, console.log(`Listening on port ${port}...`));