const mongoose = require('mongoose')

const friendSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String
})
module.exports = mongoose.model('friend', friendSchema)