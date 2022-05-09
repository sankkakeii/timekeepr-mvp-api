// Require packages
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const Mongo  = require('./config/mongo.config')
const {PORT, DB_URL} = process.env
const cookieParser = require('cookie-parser')
const cors = require('cors');

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

// installing packages
const app = express()

// MIDDLEWARE
app.use(cookieParser())

app.use(cors(corsOptions))

// parse application/json
app.use(bodyParser.json());

// Routes 
app.use('/api', require('./routes/home.route.js'));
app.use('/api/client', require('./routes/client.route.js'));
app.use('/api/user', require('./routes/user.route.js'));

// Start server
app.listen( process.env.PORT || 8080, async () => {
    await Mongo(`${DB_URL}`)
    console.log(`the server is running on Port ${PORT}`);
});