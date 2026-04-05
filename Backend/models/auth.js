const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    username:  String,
    email: String,
    password: String,
    profile: String,
    role: {
        type: String,
        enum: ["user", "admin", "superAdmin"],
        default: "user"
    }
})

module.exports = mongoose.model('userAuth', authSchema)