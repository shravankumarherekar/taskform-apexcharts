// task-form.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent implements OnInit {
  @Input() task: Task | undefined;

  taskForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [null, Validators.required],
    });
  }

  // ngOnInit(): void {
  //   if (this.task) {
  //     // If a task is provided, populate the form for editing
  //     this.taskForm.patchValue(this.task);
  //   }
  // }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const taskId = params['id'];
      if (taskId) {
        // Fetch task details based on the ID
        this.getTaskDetails(taskId);
      }
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formData = this.taskForm.value as Task;

      if (this.task) {
        // If task exists, it's an edit operation
        formData.id = this.task.id; // Set the ID for editing
        this.taskService.editTask(formData).subscribe((updatedTask) => {
          console.log('Task updated:', updatedTask);
          // Handle the response or update UI if needed
        });
      } else {
        // If task doesn't exist, it's an add operation
        this.taskService.addTask(formData).subscribe((newTask) => {
          console.log('Task added:', newTask);
          // Handle the response or update UI if needed
        });
      }

      // Reset the form after submission
      this.taskForm.reset();
    }
  }
  getTaskDetails(taskId: string) {
    this.taskService.getTaskById(taskId).subscribe((task) => {
      // Set the form values with the task details
      this.taskForm.setValue({
        id: task.id,
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
      });
    });
  }
}
