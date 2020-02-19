import {Component, OnInit, OnDestroy, ViewChild, HostListener} from '@angular/core';
import { Observable, Subscription, observable, from } from 'rxjs';
import { map, filter, scan } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { HttpClient } from '@angular/common/http';

import {TaskService} from '../services/task.service';
import {CurrentTime } from '../models/current-time';
import {Task} from '../models/task';

@Component({
  selector: 'app-progress-tab-content',
  templateUrl: './progress-tab-content.component.html',
  styleUrls: ['./progress-tab-content.component.scss'],
  animations: [
    // animation triggers go here
  ]
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
  currentTime: CurrentTime;
  isRefresh: boolean = true;
  displayedColumns: string[] = ['project', 'task','duration','star'];

  constructor(private taskService: TaskService, private http: HttpClient) {
    this.getScreenSize();
    // taskService.getTask().subscribe(task => this.task = task, ()=>{ console.log("Error Fetching Data")}, () => {
    //   console.log('fetching data..');
    // },);

    taskService.getTask().subscribe(
      { next:(task)=>{ 
        this.getCurrentTime().subscribe({next: (currentTime) => {
          this.currentTime = currentTime; 
          console.log(this.currentTime);
          this.task = task;
          if(this.isRefresh == true)
            this.refresh();
          else{
            console.log('not refreshed..');
            this.isRefresh = true;
          }
        }}); 
      },
      error: () => {}}
      );  
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = (window.innerHeight-122)+"px";
  }
  getTotalDuration() {
    if(this.task != undefined)
      return this.task.map(t => t.duration).reduce((acc, value) => acc + value, 0);
  }

  getCurrentTime() :Observable<CurrentTime> {
    return this.http.get<CurrentTime>('http://localhost:4444/Date');
  }

  startTimer(id: number) {
    console.log('starting timer...');
    console.log('progress id: '+this.progressId);
    console.log(this.progressId + " = "+id);
    if(this.progressId != undefined && this.progressId != id){
      this.pauseTimer(this.progressId);
    }
    this.progressId = id;
    this.taskService.startTimer(id);
    this.isRefresh = false;
    console.log(this.task);
    let tartgetId = this.task.map(data => data.id).indexOf(id);
    this.progressId = this.task[tartgetId].id;
    console.log("Progress Id: "+this.progressId)
      this.interval = setInterval(() => {
        this.task[tartgetId].duration++;
      },1000);
  }

  pauseTimer(id: number) {
    console.log('Pausing Timer...id: '+id);
    clearInterval(this.interval);
    let tartgetId = this.task.map(data => data.isInProgress).indexOf(true);
    if(tartgetId !=undefined && tartgetId >= 0){
      this.task[tartgetId].isInProgress = false;
      let time = this.task[tartgetId].duration;
      this.taskService.pauseTimer(time);
      console.log('paused..');
    }else{
      console.log('no timer is running..');
    }
  }

  ngOnInit() {
    this.dataSource = this.taskService.tasks;
  }

  ngOnDestroy(){
    this._docSub.unsubscribe();
  }

  refresh(){
    let tartgetId = this.task.map(data => data.isInProgress).indexOf(true);
    console.log('refreshing page..');
    console.log(this.task);
    console.log('target id: '+tartgetId);
    console.log('timer stopped..');
    clearInterval(this.interval);
    if(tartgetId !=undefined && tartgetId >= 0){
      this.progressId = this.task[tartgetId].id;
      console.log('current time: '+this.currentTime.currentDate);
      console.log('last start time'+this.task[tartgetId].lastStartTime);
      if(this.task[tartgetId].lastStartTime != undefined){
        let currentDate = new Date(this.currentTime.currentDate);
        let lastStartTime = new Date(this.task[tartgetId].lastStartTime);
        let timeDiff = currentDate.getTime() - lastStartTime.getTime();
        console.log('TimeDiff: '+timeDiff);
        console.log('Last Start Time: '+this.task[tartgetId].lastStartTime)
        this.task[tartgetId].duration+= timeDiff/1000;
        console.log('After Addition: '+this.task[tartgetId].duration);
      }
      console.log("Progress Id: "+this.progressId)
      this.interval = setInterval(() => {
        this.task[tartgetId].duration++;
      },1000);
    }
  }

  getData(){
    console.log(this.task);
  }
}