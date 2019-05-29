const os = require('os');
let cpu = os.cpus();
let sistema = os.hostname();
// Connection URL
var url = 'mongodb://lucas:1234@localhost:27017/empleados';
var col = 'datosPrueba';
//console.log(cpu);
//console.log(sistema);
// ssh -p2222 bitnami@localhost comand connect to bitnami

// Mongose
var mongoose = require('mongoose');
mongoose.connect(mongoDB);

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

function addElement(db,url,myobj) {
  db.collection(col).insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log("Documento insertado ");
     db.close();
   });
}

function findElements(db) {
  db.collection(col).find().toArray((err, items) => {
    console.log(items)
  })
}

function updateElements(db) {
  var myquery = { name: "Company Inc" };
  var newvalues = { $set: {name: "Lucas", address: "Canyon 123" } };
  db.collection(col).updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    
  });
}

function deleteElement(db,element) {

  var myquery = { _id : element };
  db.collection(col).deleteOne(myquery, function(err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
}

function deleteAll(db) {
  db.collection(col).drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("Collection deleted");
  });
}

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  var element = '5cddfe7f9aa2bf04976da4f4';
 // findElements(db);
 // addElement(db,url,myobj);
  findElements(db);
  updateElements(db);
  findElements(db);
  db.close();
});
