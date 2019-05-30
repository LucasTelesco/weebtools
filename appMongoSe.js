var url = 'mongodb://lucas:1234@localhost:27017/empleados';
var mongoose = require('mongoose');
mongoose.connect(url);
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    nombre:  String,
    tarea: String,
    estado: String
  });

  var Empleado = mongoose.model('Empleado', blogSchema);
  
  var aux = new Empleado({
    nombre: 'Lucas', tarea: 'Diseñar', estado: 'lista' 
  });

  var aux1 = new Empleado({
    nombre: 'Juan', tarea: 'Investigar', estado: 'lista' 
  });

  var aux2 = new Empleado({
    nombre: 'Marcos', tarea: 'Test', estado: 'curso' 
  });


aux.save(function(err,aux){
    if (err) throw err;
      aux1.save(function(err,aux1){
        if (err) throw err;
        aux2.save(function(err,aux2){
          if (err) throw err;
          console.log("Documento insertado3 ");
//          mongoose.connection.close();
        });
        console.log("Documento insertado2 ");
      });
    console.log("Documento insertado1 ");
});


Empleado.find(function(err, aux) {
  if (err) throw err;
  console.log(aux);
});
