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
        throw new Error(error.message);   
    }
}