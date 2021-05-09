const mongoose = require('mongoose');
const { text } = require('body-parser');

var commentsSchema = new mongoose.Schema({
    comment: {
        type: String
    }
   
});

module.exports = mongoose.model('Comments', commentsSchema);