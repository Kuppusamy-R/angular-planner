import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private socket:Socket) { }
  projects = this.socket.fromEvent<Project[]>('projects');

  getProjects() : Observable<Project[]>{
    return this.projects;
  }
}
