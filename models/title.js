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

titleSchema.method('dates', function dates() {
    var start = new Date(this.startDate);
    var end = new Date(this.endDate);
    var length = end.getTime() - start.getTime();
    return {
        start,
        end,
        length,
    };
});

titleSchema.method('overduePercentage', function overduePercentage() {
    var { start, end, length } = this.dates();
    var now = Date.now();
    var fixed = ((now - end) / length).toFixed(2);
    var od = Math.min(100, Number(fixed) * 100);
    if (isNaN(od)) {
        return 0;
    }

    return od;
});

 mongoose.model('Title', titleSchema);











// const Title = mongoose.model('Title', titleSchema);



//here it shows the the name of project in the database because we created 
//already the name of collections 'projects' ==>> so the first parmeter is 'Project' of the model 
//  module.exports = Title ;