const mongoose = require('mongoose');
const { text } = require('body-parser');

var commentsSchema = new mongoose.Schema({
    comment: {
        type: String
    }
   
});

 mongoose.model('Comments', commentsSchema);