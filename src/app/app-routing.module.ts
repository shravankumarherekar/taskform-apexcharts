// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from '../app/chart/chart.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskEditComponent } from './task-edit/task-edit.component';

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'chart', component: ChartComponent },
  { path: 'form', component: TaskFormComponent },
  { path: 'form/:id', component: TaskEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
