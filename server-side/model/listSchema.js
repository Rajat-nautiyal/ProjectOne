const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    list: {
        type: String,
        minLength: 2,
        maxLength: 46
    }
})

module.exports = mongoose.model('userList', listSchema)
