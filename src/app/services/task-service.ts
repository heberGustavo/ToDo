import { Injectable } from '@angular/core';
import { ITask } from './../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];

  public getTasks(): ITask[] {
    return this.tasks;
  }

  public addTask(value: string, date: string) {
    date = date.replace("-", "/");

    const newTask: ITask = { 
      value: value, 
      date: new Date(date), 
      done: false 
    };

    this.tasks.push(newTask);
  }

}
