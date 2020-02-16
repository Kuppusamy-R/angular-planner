import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  dataSource : Task[] = [
    {id: 1, project: 'General',task: 'Bug fixing - Developemnt Tools that', assinger: '', duration: 1, isInProgress: true},
    {id: 2, project: 'General',task: 'Bug fixing', assinger: '', duration: 1, isInProgress:false},
    {id: 3, project: 'Inedge',task: 'Login component 1', assinger: '', duration: 0, isInProgress:false},
    {id: 4, project: 'Inedge',task: 'Login component 2', assinger: '', duration: 0, isInProgress:false},
    {id: 5, project: 'Inedge',task: 'Login component 3', assinger: '', duration: 0, isInProgress:false},
    {id: 6, project: 'Inedge',task: 'Login component 4', assinger: '', duration: 0, isInProgress:false},
    {id: 7, project: 'Inedge',task: 'Login component 5', assinger: '', duration: 0, isInProgress:false},
    {id: 8, project: 'Inedge',task: 'Login component 6', assinger: '', duration: 0, isInProgress:false},
    {id: 9, project: 'Inedge',task: 'Login component 7', assinger: '', duration: 0, isInProgress:false},
    {id: 10, project: 'Inedge',task: 'Login component 8', assinger: '', duration: 0, isInProgress:false},
    {id: 11, project: 'Inedge',task: 'Login component 9', assinger: '', duration: 0, isInProgress:false},
    {id: 12, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 13, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 14, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 15, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 16, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 17, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 18, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
    {id: 19, project: 'Inedge',task: 'Login component', assinger: '', duration: 0, isInProgress:false},
  ];
  getData() : Observable<Task[]> {
    let i;
    let dataSource: Task[] = [];
    for(i = 0; i< this.dataSource.length; i++){
      dataSource.push(this.dataSource[i]);
    }
    return of(dataSource);
  }

  startTimer(id, progressId){
    let tartgetId = this.dataSource.map(data => data.id).indexOf(id);
    this.dataSource[tartgetId].isInProgress = true;
    let tempObject: Task = this.dataSource[tartgetId];
    this.dataSource[tartgetId] = this.dataSource[0];
    this.dataSource[0] = tempObject;
    console.log(this.dataSource);
  }

  pauseTimer(id: number){
    let tartgetId = this.dataSource.map(data => data.id).indexOf(id);
    this.dataSource[tartgetId].isInProgress = false;
    console.log(this.dataSource[tartgetId].task+" is paused");
  }

  constructor() { }
}

export interface Task {
  id: number,
  project: string;
  task: string;
  assinger: string;
  duration: number;
  isInProgress: boolean;
}

