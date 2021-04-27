const { json } = require('body-parser');
const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Project = mongoose.model('Project');
const Title = mongoose.model('Title');
//showing milstons part
function ratioToPercent(percent) {
    return Number(percent.toFixed(2)) * 100;
}
 
function milestonePercentage(ms, now = new Date()) {
    var { startDate, endDate } = ms;
    if (!startDate || !endDate) return 0;
    //var lasts =endDate.getTime() - startDate.getTime();
    //var left = now.getTime() - startDate.getTime();

    var lasts =Date.parse(endDate) - Date.parse(startDate);
    var left = Date.parse(now) - Date.parse(startDate);

    var ratio = left/lasts;
    return ratioToPercent(ratio);
}
 
function classForPercentage(percent) {
    switch (true) {
        case percent < 60: return 'success';
        case percent < 80: return 'warning';
        default:           return 'danger';
    }
}
 
function addPercentInfoToMs(ms) {
    var percent = ms.width = milestonePercentage(ms);
    ms.classForPercentage = classForPercentage(percent);
}


//get home and all the list
router.get('/',(req,res) => {
    Project.find((err, docs) => {
        if(!err) {
            res.render("project/homeAndList",{
                viewTitle: "Home Page: ",
                 list: docs

            })}
        else{
        console.log('Error in retrieving project list :' + err);
            }


        
    })
   
});



//get Create project
router.get('/create', (req, res) => {
    res.render("project/create", {
        viewTitle: "Create Project: "
    });
}); 




// post Create project  
router.post('/create', (req, res) => {
         insertRecord(req,res);
     
});

    
// router.get('/activity', (req, res) => {
//     res.render("project/activity", {
//         viewTitle: "Activity:"
//     });
// }); 

router.get('/assessment', (req, res) => {
    res.render("project/assessment", {
        viewTitle: "Assessment&activity",
        style: "assessment.css"
    });
}); 


//function for Create project 
function insertRecord(req,res){
    var project = new Project();
    project._id = new mongoose.Types.ObjectId(),
    project.title = req.body.title;
    project.programCode = req.body.programCode;
    project.programManager = req.body.programManager;
    project.assessmentDate = req.body.assessmentDate;
    project.estimatedFrame = req.body.estimatedFrame;
    project.endFrame = req.body.endFrame;
    project.hourlyRate = req.body.hourlyRate;
    project.budget = req.body.budget;
    project.responsible = req.body.responsible;
    project.description = req.body.description;
    project.risks = req.body.risks;


    // project.comment = req.body.comment;
    project.titlesList = [];

    // project.titlesList = [new Title({title:'new title', startDate: new Date(), endDate: new Date()})]
    // console.log(project.titlesList);
    project.save((err, doc) =>{
        if(!err){
             var id = project._id;
             res.redirect('/create/'+ id );

        }else{
            console.log('Error during the record insertion: '+ err);
        }
        
    });
};



//get the specific project with its titles list populated 
router.get('/create/:projectId', (req,res) => {
    const id = req.params.projectId;
    const titlesList = [];
    
    Project.findOne({_id:id}).populate('titlesList')
            .exec((err, project) => {
        if (!err) {
            // list of titles for the project
            var { titlesList } = project;
            titlesList.forEach(addPercentInfoToMs);
            titlesList.forEach(t => t.od = t.overduePercentage());
 
            var locals = {
                viewTitle: "Project Description:",
                viewTitlee: "Timeline:",
                project,
                titlesList,
                
            }
            res.render("project/addAll", locals);
        }
    });
});





//post List of titles
router.post('/create/:projectId', (req,res) =>{
        
    addNewDate(req,res);
        
    
});


// function for add new title 
function addNewDate(req,res){
    var projectId = req.params.projectId;//insert Project ID here from somewhere
    
    Project.findById(projectId, (err, retrievedProject) => {
        if(!err){
            var nTitle = new Title();
            nTitle._id = new mongoose.Types.ObjectId(),
            nTitle.newTitle = req.body.newTitle;
            nTitle.startDate = req.body.startDate;
            nTitle.endDate = req.body.endDate;
            nTitle.comment = req.body.comment;

            //Here we took retrievedProject._id ====> (considered as project._id object  ), because a callback function of findById it should return the object with its properties..
            nTitle.project = retrievedProject._id;

            nTitle.save((err, docs) =>{
                if(!err){
                    retrievedProject.titlesList.push(nTitle); //newly created title object added to Projects List of Titles
                    retrievedProject.save((err) => {
                        if(!err){
                            res.redirect('/create/'+projectId)      
                        }
                    });
                }else{
                    console.log('Error during the record insertion: '+ err);
                }
                
            })
            
            
        }
    
    
    })
};
    
//get update all the specific project 
    router.get('/update/:id', (req,res) => {
       const id = req.params.id;
       const titlesList = [];
       Project.findOne({_id:id}).populate('titlesList').exec((err, foundProject) => {
           if(!err){
               res.render("project/update", {
                   viewTitle: "Update The Project Description: ",
                   project: foundProject,
                   newList: foundProject.titlesList
                })
            } });   
    });           
//post update the specific project 
    router.post('/update/:id', (req,res) => {
        updateRecord(req, res)
    });   
//function for updating the specific project      
 async function updateRecord(req, res) {
        var { _id } = req.body;
        try {
          await new Promise((r, j) => {
            Project.findOneAndUpdate({ _id }, req.body, { new: true },
              (err, doc) => err ? j(err) : r(doc));
          });
        } catch (e) {
          console.error('updateRecord: error with project update', e);
          res.redirect('/');
        }
        console.log(req.body);
 
        try {

          var title = req.body.newTitle;
          var starts = req.body.startDate;
          var ends = req.body.endDate;
          var titleIds = req.body.title_id;
 
          for (var i = 0; i < titleIds.length; i++) {
            var titleId = titleIds[i];
 
            var newTitle = {
              newTitle: title[i],
              startDate: starts[i],
              endDate: ends[i],
              project: _id, // maybe not this part????
            };
 
            await Title.findOneAndUpdate({ _id: titleId }, newTitle, { new: true });
          }
         
          res.redirect('/');
        } catch (err) {
          console.error('updateRecord: Error during titles update : ', err);
        }
    }
    
    

//get update the specific title only
// router.get('/update/:id', (req,res) => {

//      Title.findById(req.params.TitleId, (err, doc) => {
//                 if (!err) {
//                     res.render("project/update", {
//                         viewTitle: "Update The Title Description: ",
//                         title: doc
//                     });
//                 }
//             });
        
// });  



//post update the specific Title only 
// router.post('/update/:id', (req,res) => {
//     updateTitle(req, res)
// });



//function updating the specific Title only     
// function updateTitle(req, res){
//     Title.findByIdAndUpdate({ _id: req.body._id}, req.body, {new: true}, (err, doc) => {
//                  if(!err){
                    
//                   res.redirect('/');

//                 }else{
//                     console.log('Error during Title update : ' + err);
//                 }
//     });    
   
// };


//delete the entire project with its titles list
router.get('/delete/:id/', (req, res) => {
    const id = req.params.id;
    Project.deleteMany({ _id: id }, (err, doc) => {
      if (!err) {
        //console.log( doc);
        //console.log(id);
        res.redirect('/');
      } else {
        console.log('Error in project delete :' + err);
      }
    });
    // Looking for Project id in the Title object in project value, if more Titles apply, the deleteMany method allows to delete them all
    Title.deleteMany({project: id} , (err, doc1) => {
        if (!err) {

          //console.log( doc1);
        } else {
          console.log('Error in title delete: ' + err);
        }
      });
});












module.exports = router;





