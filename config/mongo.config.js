require('dotenv').config();
const mongoose  = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


module.exports =  async (URL) => {
    try {
        mongoose.connect(URL, options);
        console.log(`Connected to database`);
    } catch (error) {
        console.log(`failed to connect to database ${error.message}`);   
    }
}