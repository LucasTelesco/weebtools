var mongoose = require("mongoose");
var Employee = mongoose.model("Employee");
var employeeController = {};

// all empleados
employeeController.list = function(req, res) {
    Employee.find({}).exec(function (err, employees) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/employees/index", {employees: employees});
      }
    });
  };
// unico empleado por id
  employeeController.show = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/employees/show", {employee: employee});
      }
    });
  };
  //crear empleado
  employeeController.create = function(req, res) {
    res.render("../views/employees/create");
  };
  
  //guardar nuevo empleado
  employeeController.save = function(req, res) {
    var employee = new Employee(req.body);
  
    employee.save(function(err) {
      if(err) {
        console.log(err);
        res.render("../views/employees/create");
      } else {
        console.log("Successfully created an employee.");
        res.redirect("/employees/show/"+employee._id);
      }
    });
  };

  //editar por id
  employeeController.edit = function(req, res) {
    Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
      if (err) {
        console.log("Error:", err);
      }
      else {
        res.render("../views/employees/edit", {employee: employee});
      }
    });
  };

  //actualizar empleado editado actualmente
  employeeController.update = function(req, res) {
    Employee.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, address: req.body.address, position: req.body.position, salary: req.body.salary }}, { new: true }, function (err, employee) {
      if (err) {
        console.log(err);
        res.render("../views/employees/edit", {employee: req.body});
      }
      res.redirect("/employees/show/"+employee._id);
    });
  };

  //eliminar empleado
  employeeController.delete = function(req, res) {
    Employee.remove({_id: req.params.id}, function(err) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("Employee deleted!");
        res.redirect("/employees");
      }
    });
  };

  module.exports = employeeController;