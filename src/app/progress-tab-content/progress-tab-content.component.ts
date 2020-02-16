import {Component, OnInit, OnDestroy, ViewChild, HostListener} from '@angular/core';
import { Observable, Subscription, observable } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import {TaskService} from '../services/task.service';
import {Task} from '../models/task';

@Component({
  selector: 'app-progress-tab-content',
  templateUrl: './progress-tab-content.component.html',
  styleUrls: ['./progress-tab-content.component.scss']
})
export class ProgressTabContentComponent implements OnInit {
  dataSource: Observable<Task[]>;
  task: Task[];
  currentDoc: string;
  private _docSub: Subscription;
  timer: number;
  interval: any;
  scrHeight: any;
  scrWidth: any;
  progressId: number;
  displayedColumns: string[] = ['project', 'task','duration','star'];

  constructor(private taskService: TaskService) {
    this.getScreenSize();
    this.refresh();
    taskService.getTask().subscribe(task => this.task = task);
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = (window.innerHeight-122)+"px";
  }
  getTotalDuration() {
    //return this.dataSource.map(t => t.duration).reduce((acc, value) => acc + value, 0);
    return 3600;
  }
  startTimer(id: number) {
    let tartgetId = this.task.map(data => data.id).indexOf(id);
    console.log('progress id: '+this.progressId);
    console.log(this.progressId + " = "+id);
    if(this.progressId != undefined && this.progressId != id){
      this.pauseTimer(this.progressId);
    }
    this.taskService.startTimer(id, this.progressId);
    this.refresh();
  }

  pauseTimer(id: number) {
    //this.taskService.pauseTimer(id);
    clearInterval(this.interval);
  }

  ngOnInit() {
    this.dataSource = this.taskService.tasks;
    console.log(this.dataSource);
  }

  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  refresh(){
    // this.taskService.getData().subscribe((data: Task[]) => {
    //   this.dataSource.data = data;
    // });
  //   let tartgetId = this.dataSource.data.map(data => data.isInProgress).indexOf(true);
  //   this.progressId = this.dataSource.data[tartgetId].id;
  //   console.log('refreshing.. progress id: '+this.progressId);
  //   this.interval = setInterval(() => {
  //       this.dataSource.data[tartgetId].duration++;
  //   },1000);
  }
}