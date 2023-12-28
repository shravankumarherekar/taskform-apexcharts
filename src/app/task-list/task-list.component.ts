// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.taskForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      dueDate: [''],
    });
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  editTask(task: Task) {
    this.taskForm.patchValue({
      id: task.id,
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
    });

    // Navigate to the edit form with the task ID
    this.router.navigate(['/form', task.id]);
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    });
  }

  onSubmit() {
    const formData = this.taskForm.value;

    if (formData.id) {
      this.taskService.editTask(formData).subscribe((editedTask) => {
        const index = this.tasks.findIndex((task) => task.id === editedTask.id);
        if (index !== -1) {
          this.tasks[index] = editedTask;
        }
      });
    } else {
      this.taskService.addTask(formData).subscribe((newTask) => {
        this.tasks.push(newTask);
      });
    }

    this.taskForm.reset();
  }
}
