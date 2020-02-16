import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = this.socket.fromEvent<Task[]>('tasks');
  constructor(private socket:Socket) { }

  getTask() : Observable<Task[]> {
    return this.tasks;
  }
}
