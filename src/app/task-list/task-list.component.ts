// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onDelete(taskId: number): void {
    this.taskService.deleteTask(taskId).subscribe(() => {
      // Reload tasks after deletion
      this.taskService.getTasks().subscribe((tasks) => {
        this.tasks = tasks;
      });
    });
  }
}
