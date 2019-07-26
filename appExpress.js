var express = require("express");
var mongoose = require('mongoose');
var path = require("path");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://lucas:1234@localhost:27017/empleados');
const bodyParser = require('body-parser');

var Schema = mongoose.Schema;

var blogSchema = new mongoose.Schema({
    nombre:  String,
    tarea: String,
    isDone: Boolean,
  });

var Empleado = mongoose.model('Empleado', blogSchema);

//var router = express.Router();

var app = express(); //starts up your app
app.use(bodyParser.json());
/*
app.get("/",function(req,res){
 res.send("Hello world");
});
*/
/* GET ALL EMPLEADO */
empleadoslist = function(req,res){
    //res.send("probandooo");
    Empleado.find(function(err, response){
        if (err) throw err;
        res.json(response);
     }); 
};

/* GET SINGLE EMPLEADO BY ID */
empleadoId = function(req, res, next) {
  Empleado.findById(req.params.id, function (err, post) {
    if (err) throw err;
    res.json(post);
  });
};

/* SAVE EMPLEADO */
saveEmpleado = function(req, res, next) {
  Empleado.create(req.body, function (err, post) {
    if (err) return next(err);
    console.log("esta en guardar empleado"+req.body);
    res.json(post);
  });
};

/* DELETE PRODUCT */
deleteId =  function(req, res, next) {
  Empleado.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

/* UPDATE PRODUCT */
updateEmpl = function(req, res, next) {
  Empleado.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
};

console.log("Server started on http://localhost:3000"); 

app.get('/empleados',empleadoslist);
app.get('/empleados/:id',empleadoId);
app.post('/',saveEmpleado);
app.delete('/delete/:id',deleteId);
app.put('/:id',updateEmpl);

app.use(express.static(path.join(__dirname,'dist')));

app.listen(3000);

/*
Ejemplo add Element
curl -i -X POST -H "Content-Type: application/json" -d '{ "nombre":"Daniell","tarea":"code","estado": "lista" }' localhost:3000/
*/