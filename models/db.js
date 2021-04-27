const mongoose = require('mongoose');




// mongoose.connect('mongodb://localhost:27017/ProjectDB', { useNewUrlParser: true }, (err) => {
//     if (!err) {console.log('MongoDB Connection Succeeded.')}
//     else {console.log('Error in DB connection : ' + err)}
// });

// mongoose.connect(uri, { useNewUrlParser: true })



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/ProjectDB', { useNewUrlParser: true }, (err) => {
    //console.log(process.env.MONGODB_URI)
    if (!err) {console.log('MongoDB Connection Succeeded.')}
    else {console.log('Error in DB connection : ' + err)}
});





// mongoose.connect('mongodb+srv://admin:admin@projectdb.5edq0.mongodb.net/ProjectDB?retryWrites=true&w=majority', { useNewUrlParser: true }, (err) => {
//     if (!err) {console.log('MongoDB Connection Succeeded.')}
//     else {console.log('Error in DB connection : ' + err)}
// });


require('./project');
require('./title');
require('./joinNotesMilestons');
require('./notes');
// const Project = mongoose.model('Project', projectSchema);
// const Title = mongoose.model('Title', titleSchema);



// module.exports = {
//     Project,
//     Title


// }







// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);