var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var path = require("path");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://lucas:1234@mongo:27017/admin')
.then(()=> console.log("mongo conect"))
.catch((err)=> console.log(err));
const bodyParser = require('body-parser');

var Schema = mongoose.Schema;

var blogSchema = new mongoose.Schema({
    nombre:  String,
    tarea: String,
    isDone: Boolean,
  });

var Empleado = mongoose.model('Empleado', blogSchema);

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


router.get('/empleados',empleadoslist);
router.get('/empleados/:id',empleadoId);
router.post('/',saveEmpleado);
router.delete('/delete/:id',deleteId);
router.put('/:id',updateEmpl);

module.exports = router;