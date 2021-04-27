const mongoose = require('mongoose');
const { text } = require('body-parser');

var titleSchema = new mongoose.Schema({
    newTitle: {
        type: String
    },
    
    startDate:{
        type: String
    },
    endDate: {
        type: String
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments'
    }],
    
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'

    },
      joinNotesMilestons: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JoinNotesMilestons'
    }

});

 mongoose.model('Title', titleSchema);











// const Title = mongoose.model('Title', titleSchema);



//here it shows the the name of project in the database because we created 
//already the name of collections 'projects' ==>> so the first parmeter is 'Project' of the model 
//  module.exports = Title ;