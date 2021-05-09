const mongoose = require('mongoose');
const { text } = require('body-parser');





var projectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    programCode: {
        type: String
    },
    programManager: {
        type: String
    },
    assessmentDate:{
        type: String
    },
    
    estimatedFrame:{
        type: String
    },
    endFrame:{
        type: String
    },
    hourlyRate:{
        type: String
    },
    budget:{
        type: String
    },
    responsible:{
        type: String
    },
    description:{
        type: String
    },
    risks:{
        type: String
    },
    titlesList: [{
        type: mongoose.Schema.Types.ObjectId,
         ref: "Title",
         required: true
    }],
    /*
        Report Last Render Date (relates to progress bar feature)

        This field gives the ability to save the state of all the progress
        bars of a project together, instead of displaying them based on the
        current date.

        When rendering the progress bars, make sure to check this field, and
        also the same field in the individual titles.
     */
    reportLastRenderDate: {
        type: Date,
    },
});

module.exports = mongoose.model('Project', projectSchema);

//  const Project = mongoose.model('Project', projectSchema);

//  const data = {
//     title: 'yass',
//     programCode: '1111'
// }

// const newProject = new Project(data);
// newProject.save((error) => {
//     if (error) {

//     console.log('Ooopes')
//     }else{
//         console.log('data has been saved');
//     }
// });







 //const Project = mongoose.model('Project', projectSchema);

//here it shows the the name of project in the database because we created 
//already the name of collections 'projects' ==>> so the first parmeter is 'Project' of the model 

// module.exports = Project ;