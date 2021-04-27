require('./models/db');

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');
const Handlebars = require('handlebars');

// const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const projectControllers = require('./controllers/projectControllers');

// const pdfmakeControllers = require('./pdfMake/pdfmakeControllers')
var pdfmakeControllers = express.Router();

var app = express();
var PORT = process.env.PORT || 4000;

app.use(express.static('public'));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json()); 
app.set('views', path.join(__dirname,'/views/') );
console.log(__dirname);
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/'}));
// app.set('view engine', 'hbs');
app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs');

app.listen(PORT, () => {
    console.log('Express server started at port : 4000');
});
app.use('/', projectControllers,pdfmakeControllers);   
// app.use('/homeAndList', projectControllers,pdfmakeControllers);
//