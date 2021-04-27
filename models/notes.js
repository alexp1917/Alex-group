const mongoose = require('mongoose');
const { text } = require('body-parser');

var notesSchema = new mongoose.Schema({
    comments: [{
        type: String
    }],
    joinNotesMilestons: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinNotesMilestons'
    }
});

 mongoose.model('Notes', notesSchema);

