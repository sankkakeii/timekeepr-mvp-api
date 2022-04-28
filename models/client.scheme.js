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
        unique: true,
        trim:true
    },
    password:{
        type: String,
        required: [true, "password is required"],
        trim:true,
    },
    companyName: {
        type: String,
        unique: true,
        trim:true
    },
    clockInTime: {
        type: String,
        unique: true,
        trim:true
    },  
    organizationLocation: {
        type: Array,
        // enum: ['Point','Polygon'],
        coordinates: []
    },
}, { timestamps:true})

clientSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Client = mongoose.model("client", clientSchema);

const signUpValidate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.signUpValidate(data);
};

module.exports = { Client, signUpValidate };


