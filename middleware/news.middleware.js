const checkNumber = (req,res,next) =>{
    try {
        const {integer} = req.query;
        if(integer < 5) res.send(`baba you're too small`)
        next()
    } catch (error){
        console.log(error.message)
    }
}

module.exports = checkNumber;



// req.query
// req.body
// req.params
// req.headers
// req.cookies
// req.files
