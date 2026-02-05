import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import { ITask } from './../interface/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: ITask[] = [];

  public getAllTasks(): ITask[] {
    return this.tasks;
  }

  public getTasksPending(): ITask[] {
    return this.tasks.filter(task => !task.done);
  }

  public getTasksDone(): ITask[] {
    return this.tasks.filter(task => task.done);
  }

  public addTask(value: string, date: string) {
    const tempId: string = `${Date.now()}-${Math.random().toString(36).substring(2, 8)};`

    const newTask: ITask = {
      id: tempId,
      value: value,
      date: this.convertDate(date),
      done: false
    };

    this.tasks.push(newTask);
    this.setToStorage();
  }

  public updateTask(id: string, value: string, date: string) {
    let task = this.tasks.find(item => item.id === id);

    if(task !== null) {
      task!.value = value;
      task!.date = this.convertDate(date);
      //this.tasks.splice(index, 1, task);
      this.setToStorage();
    }
  }

  public updateDone(id: string, done: boolean) {
    let task = this.tasks.find(item => item.id === id);
    if(task !== null){
      task!.done = done;
      this.setToStorage();
    }
  }

  public removeTask(id: string) {
    this.tasks = this.tasks.filter(item => item.id !== id);
    this.setToStorage();
  }

  private convertDate(date: string): Date {
    date = date.replace("-", "/");
    return new Date(date);
  }

  async setToStorage() {
    await Preferences.set({
      key: 'tasks',
      value: JSON.stringify(this.tasks)
    });
  }

  async getFromStorage() {
    const resp = await Preferences.get({ key: 'tasks' });
    const respData: ITask[] = resp.value == null ? new Array() : JSON.parse(resp.value);

    for(let t of respData){
      if(t.date !== null)
        t.date = new Date(t.date);

      this.tasks.push(t);
    }
  }

}
