import { Injectable } from '@angular/core';
import { ITask } from '../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];

  public getTasks(): ITask[] {
    return this.tasks;
  }

  public addTask(task: ITask) {
    this.tasks.push(task);
  }

}
