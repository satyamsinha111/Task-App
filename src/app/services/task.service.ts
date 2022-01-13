import { Task } from './../utils/data.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  public users: string[] = ['User-1', 'User-2', 'User-3'];

  constructor() {}

  createTask(data: Task) {
    if (localStorage.getItem('tasks')) {
      let tasksStringified: any = localStorage.getItem('tasks');
      let taskParsed: Task[] = JSON.parse(tasksStringified);
      taskParsed.push(data);
      localStorage.setItem('tasks', JSON.stringify(taskParsed));
    } else {
      let task: Task[] = [];
      task.push(data);
      localStorage.setItem('tasks', JSON.stringify(task));
    }
  }

  getAllTask(): Task[] {
    let tasks: Task[] = [];
    let data: any = localStorage.getItem('tasks');
    tasks = JSON.parse(data);
    return tasks;
  }

  getImportantTasks(): Task[] {
    let tasks: Task[] = [];
    let importantTasks: Task[] = [];
    let data: any = localStorage.getItem('tasks');
    tasks = JSON.parse(data);
    tasks.map((value, index) => {
      if (value.Important) {
        importantTasks.push(value);
      }
    });
    return importantTasks;
  }

  toggleTaskImportance(taskId: string | undefined) {
    let tasks: Task[] = [];
    let data: any = localStorage.getItem('tasks');
    tasks = JSON.parse(data);
    tasks.map((value, index) => {
      if (value.TaskId === taskId) {
        value.Important = !value.Important;
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}
