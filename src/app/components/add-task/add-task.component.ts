import { Component, OnInit, Inject } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ProjectService } from '../../services/project.service';
import { TaskService} from '../../services/task.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'add-task-dialog',
  templateUrl: 'add-task-dialog.html',
  styleUrls: ['add-task-dialog.scss'],
})
export class AddTaskDialog{

  minDate: Date;
  maxDate: Date;
  selectedDate: FormControl;

  constructor(
    public dialogRef: MatDialogRef<AddTaskDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectService : ProjectService)
     {
      const currentYear = new Date().getFullYear();
      this.selectedDate =  new FormControl({value: new Date(), disabled: true});
      this.minDate = new Date();
      this.maxDate = new Date(currentYear + 1, 11, 31);
      console.log('opening window');
      projectService.getProjects().subscribe(
        {
          next: (data)=>{
            console.log('data received');
          },
          error: (err)=>{
            console.log(err);
          },
          complete: ()=>{ 
            console.log('completed')
          }
        }
      );
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){}
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  animal: string;
  name: string;
  scrWidth: number

  constructor(public dialog: MatDialog) {
    this.scrWidth = (window.innerHeight);
  }

  openDialog(): void {
    let width;
    if(this.scrWidth > 600){
      width = '900px';
    }else{
      width = '300px'
    }
    const dialogRef = this.dialog.open(AddTaskDialog, {
      width: width,
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  ngOnInit() {
  }
}
