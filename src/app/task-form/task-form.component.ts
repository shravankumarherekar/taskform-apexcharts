// task-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  @Input() task: Task;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      taskName: [this.task ? this.task.taskName : '', Validators.required],
      description: [
        this.task ? this.task.description : '',
        Validators.required,
      ],
      dueDate: [this.task ? this.task.dueDate : '', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const newTask: Task = {
        id: this.task ? this.task.id : new Date().getTime(),
        taskName: formValue.taskName,
        description: formValue.description,
        dueDate: formValue.dueDate,
      };

      if (this.task) {
        this.taskService.editTask(newTask);
      } else {
        this.taskService.addTask(newTask);
      }

      // Reset form after submission
      this.taskForm.reset();
    }
  }
}
