import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { Task } from '../Task' ;

@Injectable()
export class TaskService {
  domain: string = 'http://localhost:3000';
  // domain: string = 'www.mydomainapi.com/';

  constructor(private http: HttpClient) {
  }
  
  getTasks() {
    return this.http.get<Task[]>(`${this.domain}/empleados`)
      .map(res => res);
  }
 
  addTask(newTask: Task) {
    return this.http.post<Task>(`${this.domain}/`, newTask)
      .map(res => res);
  }

  deleteTask(id) {
    return this.http.delete<Task>(`${this.domain}/delete/${id}`)
      .map(res => res);
  }

  updateTask(newTask) {
    return this.http.put<Task>(`${this.domain}/${newTask._id}`, newTask)
      .map(res => res)
  }
}
