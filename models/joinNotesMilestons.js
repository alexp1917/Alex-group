const mongoose = require('mongoose');
const { text } = require('body-parser');

var joinNotesMilestonsSchema = new mongoose.Schema({
    notes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notes'
    },   
    title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Title'
    }

});

 mongoose.model('JoinNotesMilestons', joinNotesMilestonsSchema);

