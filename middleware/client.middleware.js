const mongoose = require('mongoose');
// 89N3PDyZzakoH7W6n8ZrjGDDktjh8iWFG6eKRvi3kvpQ
const cookieParser = require('cookie-parser')

const clientMiddleware = {



  verifyJWT: (req, res, next) =>{
    const token = req.headers["x-access-token"]
    if(!token){
      res.send('token not found')
    }else{
      jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) =>{
        if(err){
          res.json({auth:false, message: 'authentication failed'})
        }else{ 
          req.companyId = decoded.companyId
          next()
        }
      })
    }

  },

 
};


module.exports = clientMiddleware;

