var express = require("express");
var mongoose = require('mongoose');
mongoose.connect('mongodb://lucas:1234@localhost:27017/empleados');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
    nombre:  String,
    tarea: String,
    estado: String
  });

var Empleado = mongoose.model('Empleado', blogSchema);

//var router = express.Router();

var app = express(); //starts up your app
/*
app.get("/",function(req,res){
 res.send("Hello world");
});
*/
empleadoslist = function(req,res){
    //res.send("probandooo");
    Empleado.find(function(err, response){
        if (err) throw err;
        res.json(response);
     }); 
};
console.log("Server started on http://localhost:3000"); 

app.get('/empleados',empleadoslist);

app.listen(3000);