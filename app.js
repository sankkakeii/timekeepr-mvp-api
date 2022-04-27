// Require packages
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const Mongo  = require('./config/mongo.config')
const {PORT, DB_URL} = process.env
const cookieParser = require('cookie-parser')
const mongoose  = require('mongoose');

// installing packages
const app = express()



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

// connect to database
const Mongo =  async (URL) => {
    try {
        mongoose.connect(URL, options);
        console.log(`Connected to database`);
    } catch (error) {
        console.log(`failed to connect to database ${error.message}`);   
    }
}

// MIDDLEWARE
app.use(cookieParser())

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