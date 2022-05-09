const mongoose = require('mongoose');
// const { Schema } = mongoose

const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const clientSchema = new mongoose.Schema({
    // username: {
    //     type: String,
    //     unique: true,
    //     trim:true
    // },
    email: {
        type: String,
        required:[true, "email is required"],
        trim:true
    },
    password:{
        type: String,
        required: [true, "password is required"],
        trim:true,
    },
    // companyName: {
    //     type: String,
    //     unique: true,
    //     trim:true
    // },
}, { timestamps:true})


const Client = mongoose.model("client", clientSchema);


module.exports = { Client };


