const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    
    companyId:{type:mongoose.SchemaTypes.ObjectId},
    firstName:{
        type: String,
        required: [true, "name is required"],
        trim:true,

    },
    lastName:{
        type: String,
        required: [true, "name is required"],
        trim:true,

    },
    role:{
        type: String,
        required: [true, "role is required"],
        trim:true,
    },
    phone:{
        type: String,
        required: [true, "role is required"],
        trim:true,
    },
    email:{
        type: String,
        required: [true, "email is required"],
        // minlength: 20,
        trim:true,
    },
    status: {
        type: Object,
        status: {
            clockedIn: false,
            onTime: false,
            clockInTime: String
        }
    },
    // log: {
    //     type: Array,
    // },
}, { timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = { User };

