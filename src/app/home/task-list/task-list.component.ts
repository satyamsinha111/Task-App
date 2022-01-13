import { Task } from './../../utils/data.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  public importantTasks: Task[] = [];
  constructor(
    private _matDialogRef: MatDialogRef<TaskListComponent>,
    private _taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.importantTasks = this._taskService.getImportantTasks();
  }

  onClose() {
    this._matDialogRef.close(true);
  }
}
