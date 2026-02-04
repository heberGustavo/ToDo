import { Injectable } from '@angular/core';
import { ITask } from './../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];

  public getAllTasks(): ITask[] {
    return this.tasks;
  }

  public getTasksPending() : ITask[]{
    return this.tasks.filter(task => !task.done);
  }

  public getTasksDone() : ITask[]{
    return this.tasks.filter(task => task.done);
  }

  public addTask(value: string, date: string) {
    const newTask: ITask = { 
      value: value, 
      date: this.convertDate(date),
      done: false 
    };

    this.tasks.push(newTask);
  }

  public updateTask(index: number, value: string, date: string) {
    let task = this.tasks[index];

    task.value = value;
    task.date = this.convertDate(date);
    this.tasks.splice(index, 1, task);
  }

  public removeTask(index: number){
    this.tasks.splice(index, 1);
  }

  private convertDate(date: string): Date {
    date = date.replace("-", "/");
    return new Date(date);
  }

}
