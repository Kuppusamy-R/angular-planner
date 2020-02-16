import {Component, OnInit, ViewChild, HostListener} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

import { TaskService, Task} from '../task.service';

@Component({
  selector: 'app-progress-tab-content',
  templateUrl: './progress-tab-content.component.html',
  styleUrls: ['./progress-tab-content.component.scss']
})
export class ProgressTabContentComponent implements OnInit {
  timer: number;
  interval: any;
  scrHeight: any;
  scrWidth: any;
  progressId: number;
  displayedColumns: string[] = ['project', 'task','duration','star'];
  dataSource = new MatTableDataSource<Task>([]);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.scrHeight = (window.innerHeight-122)+"px";
  }
  getTotalDuration() {
    return this.dataSource.data.map(t => t.duration).reduce((acc, value) => acc + value, 0);
  }
  startTimer(id: number) {
    // let tartgetId = this.dataSource.data.map(data => data.id).indexOf(id);
    console.log('progress id: '+this.progressId);
    console.log(this.progressId + " = "+id);
    if(this.progressId != undefined && this.progressId != id){
      this.pauseTimer(this.progressId);
    }
    this.myTaskSevice.startTimer(id, this.progressId);
    this.refresh();
  }

  pauseTimer(id: number) {
    this.myTaskSevice.pauseTimer(id);
    clearInterval(this.interval);
  }

  constructor(private myTaskSevice: TaskService) {
    this.getScreenSize();
    this.refresh();
  }

  ngOnInit() {
  }

  refresh(){
    this.myTaskSevice.getData().subscribe((data: Task[]) => {
      this.dataSource.data = data;
    });
    let tartgetId = this.dataSource.data.map(data => data.isInProgress).indexOf(true);
    this.progressId = this.dataSource.data[tartgetId].id;
    console.log('refreshing.. progress id: '+this.progressId);
    this.interval = setInterval(() => {
        this.dataSource.data[tartgetId].duration++;
    },1000);
  }

}