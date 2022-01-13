import { TaskService } from './../services/task.service';
import { Task } from './../utils/data.interface';
import { AddTaskComponent } from './add-task/add-task.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public myTasks: Task[] = [
    {
      Task: 'Go to gym',
      Expiry_date: '2 July 2021',
      User: 'Mahesh',
      Important: false,
    },
  ];
  displayedTaskListColumns: string[] = [
    'Task',
    'Expiry_date',
    'User',
    'Important',
  ];
  // dataSource = ELEMENT_DATA;

  constructor(private _dialog: MatDialog, private _taskService: TaskService) {}

  ngOnInit(): void {
    this.myTasks = this._taskService.getAllTask();
    if (this.myTasks.length > 0) {
      this._dialog.open(TaskListComponent);
    }
  }

  onToggleTask(task: Task) {
    this._taskService.toggleTaskImportance(task.TaskId);
  }

  addTask() {
    let dialogRef = this._dialog.open(AddTaskComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.myTasks = this._taskService.getAllTask();
    });
  }
}
