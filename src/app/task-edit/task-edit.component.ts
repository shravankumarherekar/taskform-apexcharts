// task-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  taskForm: FormGroup;
  taskId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private fb: FormBuilder
  ) {
    this.taskForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      dueDate: [''],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.taskId = params.get('id')!; // Use the non-null assertion operator
      if (this.taskId) {
        this.loadTaskDetails();
      }
    });
  }

  loadTaskDetails() {
    this.taskService.getTaskById(this.taskId).subscribe((task) => {
      this.taskForm.patchValue(task);
    });
  }

  onSubmit() {
    const formData = this.taskForm.value;

    if (this.taskId) {
      this.taskService.editTask(formData).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      // Handle the case where the task ID is not available
    }
  }
}
