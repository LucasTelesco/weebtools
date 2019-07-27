var express = require("express");
var mongoose = require('mongoose');
var path = require("path");
mongoose.Promise = global.Promise;

const bodyParser = require('body-parser');




//var router = express.Router();
var app = express(); //starts up your app
var index = require('./routes/index');
app.use(bodyParser.json());

app.use('/', index);


console.log("Server started on http://localhost:3000"); 
app.use(express.static(path.join(__dirname,'dist')));
app.listen(3000);

/*
Ejemplo add Element
curl -i -X POST -H "Content-Type: application/json" -d '{ "nombre":"Daniell","tarea":"code","estado": "lista" }' localhost:3000/
*/