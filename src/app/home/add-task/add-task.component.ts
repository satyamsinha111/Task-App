import { Task } from './../../utils/data.interface';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { nanoid } from 'nanoid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  public minDate: Date = new Date();
  public taskData: Task = {
    TaskId: nanoid(),
    Task: '',
    Expiry_date: '',
    Important: false,
    User: '',
  };
  constructor(
    private _matDialogRef: MatDialogRef<AddTaskComponent>,
    private _taskService: TaskService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  getAllUsers(): string[] {
    return this._taskService.users;
  }

  onClose() {
    this._matDialogRef.close(true);
  }

  onAdd() {
    if (this.taskData.Task === '') {
      this._snackBar.open('Please enter task description', 'OK', {
        duration: 2000,
      });
      return;
    }
    if (this.taskData.Expiry_date === '') {
      this._snackBar.open('Please select expiry', 'OK', {
        duration: 2000,
      });
      return;
    }

    if (this.taskData.User === '') {
      this._snackBar.open('Please select user', 'OK', {
        duration: 2000,
      });
      return;
    }

    this.taskData.Created_on = new Date().toDateString();
    console.log(this.taskData);
    this._taskService.createTask(this.taskData);
    this.onClose();
  }
}
