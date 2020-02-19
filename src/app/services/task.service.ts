import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


import { Task } from '../models/task';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private socket:Socket) { }
  
  tasks = this.socket.fromEvent<Task[]>('tasks');
  

  getTask() : Observable<Task[]> {
    return this.tasks;
  }

  startTimer(id: number) {
    this.socket.emit('startTimer',{id: id});
  }

  pauseTimer(time: number) {
    this.socket.emit('pauseTimer', {time: time});
  }
}
