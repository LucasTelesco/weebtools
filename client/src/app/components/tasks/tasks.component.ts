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
      estado:"falta"
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
    const response = confirm('are you sure to delete it?');
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



}
