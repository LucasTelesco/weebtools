var url = 'mongodb://lucas:1234@localhost:27017/empleados';
var mongoose = require('mongoose');
mongoose.connect(url);
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    nombre:  String,
    tarea: String,
    estado:   String
  });

  var Empleado = mongoose.model('Empleado', blogSchema);
  
  var aux = new Empleado({
    name: { first: 'Axl', last: 'Rose' }
  });

aux.save(function(err,aux){
    if (err) throw err;
    console.log("Documento insertado ");
});

/*  Crear varios de estos e insertarlos */
/*
  const Clock = mongoose.model('Clock', schema);

  BS.blogSchema

  BS.find(function(err,datos){
    if (err) thown error;
    console.log("todu bemm");
  });
  */