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
    }]
});

 mongoose.model('Project', projectSchema);

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