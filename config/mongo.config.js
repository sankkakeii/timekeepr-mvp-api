require('dotenv').config();
const mongoose  = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useMongoClient:true
}


module.exports =  async (URL) => {
    try {
        mongoose.createConnection(URL, options);
        console.log(`Connected to database`);
    } catch (error) {
        throw new Error(error.message);   
    }
}