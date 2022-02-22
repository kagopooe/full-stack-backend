const express = require('express')
const app = express();

//importing routes
const authRoute = require('./routes/auth')



//route middleware
app.use('/api/user', authRoute);




















const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));