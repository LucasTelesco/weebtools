import { Component, OnInit } from '@angular/core';

import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  title: string;
  title2: string;

  constructor(private taskService: TaskService) {
    this.taskService.getTasks()
      .subscribe(tasks => {
        console.log(tasks);
        this.tasks = tasks;
      });
  }


  ngOnInit() {
  }

  addTask(event){
    event.preventDefault();
    const newTask:Task = {
      nombre:this.title,
      tarea:this.title2,
      isDone:false,
      //title: this.title,
      //isDone: false
    };
    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.tasks.push(task);
        this.title = '';
        this.title2 = '';
      })        
  }
  deleteTask(id) {
    const response = confirm('seguro que desea eliminar?');
    if (response ){
      const tasks = this.tasks;
      this.taskService.deleteTask(id)
        .subscribe(data => {
          console.log(data.n);
          
            for(let i = 0; i < tasks.length; i++) {
              if(tasks[i]._id == id) {
                tasks.splice(i, 1);
              }
            }
  
        })
    }
  }     
  
  updateStatus(task: Task) {
    var newTask = {            
      _id: task._id,
      nombre: task.nombre,
      tarea: task.tarea,
      isDone: !task.isDone
    };
    this.taskService.updateTask(newTask)
      .subscribe(res => {
        task.isDone = !task.isDone;
      })
  }

}
