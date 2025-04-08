const mongoose = require('mongoose')
const LibrarySchema = new mongoose.Schema({
    
    bookname : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required : true
    },
    publisher : {
        type: String,
        required : true
    },
    poster: {
        type: String,
        required: true
    },
    genre : {
        type: String,
        required : true
    }

})

const Library = mongoose.model('Library', LibrarySchema);
module.exports = { Library }