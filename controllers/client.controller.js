const { Client, signUpValidate } = require("../models/client.scheme");
const { Location } = require("../models/location.scheme");
const { User } = require("../models/user.scheme");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// const router = express.Router();

const newClient = {

  // client sign up
  signUp: async (req, res) =>{
    // register new user
    try{
    const {email,password} = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const client = await new Client({password:hashedPassword,email});
    client.save().then(clientInfo => {
      jwt.sign({id:clientInfo._id,email:clientInfo.email}, process.env.JWTPRIVATEKEY, (err,token) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.cookie('token', token).json({id:clientInfo._id,email:clientInfo.email});
        }
      });
    });
    } catch(err){
      return err
    }
  },

  // client login
  login: async(req, res) => {
    const {email,password} = req.body;
    await Client.findOne({email})
      .then(clientInfo => {
        if (!clientInfo) {
          return res.sendStatus(401);
        }
        const passOk = bcrypt.compareSync(password, clientInfo.password);
        if (passOk) {
          jwt.sign({id:clientInfo._id,email}, process.env.JWTPRIVATEKEY, (err,token) => {
            if (err) {
              console.log(err);
              res.sendStatus(500);
            } else {
              res.cookie('token', token).json({id:clientInfo._id,email:clientInfo.email});
            }
          });
        } else {
          res.sendStatus(401);
        }
      })
  },

  dashboard: async (req, res) =>{
    res.json('dashboard')

  }, 

  addUser: async (req, res) =>{
    // create and add user to the database
    const payload = jwt.verify(req.cookies.token, process.env.JWTPRIVATEKEY);
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      role: req.body.role,
      companyId: new mongoose.Types.ObjectId(payload.id)
    });
    user.save().then((user) => {
      res.json(user);
    });
    
  },

  addLocation: async (req, res) => {
    // create and add location  to the database

    const payload = jwt.verify(req.cookies.token, process.env.JWTPRIVATEKEY);
    const location = await new Location({
      companyName: req.body.companyName,
      clockInTime: req.body.clockInTime,
      organizationLocation: req.body.organizationLocation,
      companyId: new mongoose.Types.ObjectId(payload.id)
    });
    location.save().then((location) => {
      res.json(location);
    });
  },

  viewUsers: async (req, res) =>{
    res.send('no current users')

  },

  viewAnalytics: async (req, res) =>{

  },

  payments: async (req, res) =>{

  },

  notifications: async (req, res) =>{

},

  settings: async (req, res) =>{

  },
};

// module.exports = router;
module.exports = newClient;

