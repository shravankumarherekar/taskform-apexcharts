import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';
import { ChartComponent } from './chart/chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TaskEditComponent } from './task-edit/task-edit.component';
@NgModule({
  declarations: [
    AppComponent,
    TaskFormComponent,
    TaskListComponent,
    ChartComponent,
    NavigationComponent,
    TaskEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    HttpClientModule,
    NgApexchartsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
