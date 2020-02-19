import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HttpClientModule }    from '@angular/common/http';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule} from './material-modules';
import { ProgressTabContentComponent } from './progress-tab-content/progress-tab-content.component';
import { OpenCloseComponent } from './components/open-close/open-close.component';
import { AddTaskComponent, AddTaskDialog} from './components/add-task/add-task.component';

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    ProgressTabContentComponent,
    OpenCloseComponent,
    AddTaskComponent,
    AddTaskDialog,
    
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }}],
  bootstrap: [AppComponent],
  entryComponents: [AddTaskDialog],
})
export class AppModule { }
