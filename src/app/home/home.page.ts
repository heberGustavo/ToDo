import { Component } from '@angular/core';
import { AlertController, PopoverController, ToastController } from '@ionic/angular';

import { TaskService } from '../services/task-service';

import { ITask } from '../interface/task.interface';
import { DateFormatService } from '../services/date-format-service';
import { PopoverComponent } from '../components/popover/popover.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  typeTask: string = 'pending';

  constructor(
    public taskService: TaskService,
    public dateFormatService: DateFormatService,
    public alertController: AlertController,
    public toastController: ToastController,
    public popoverController: PopoverController
  ) { }

  async presentAlertPromptAdd() {
    const alert = await this.alertController.create({
      header: 'Add task!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Task'
        },
        {
          name: 'date',
          type: 'date',
          min: '2000-01-01',
          max: '2050-31-12'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Save',
          handler: (alertData) => {
            if (alertData.task !== '') {
              this.taskService.addTask(alertData.task, alertData.date);
            }
            else {
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptUpdate(index: number, task: ITask) {

    const dataFormatada = this.dateFormatService.format(task.date);
    console.log(dataFormatada);

    const alert = await this.alertController.create({
      header: 'Update task!',
      inputs: [
        {
          name: 'task',
          type: 'text',
          placeholder: 'Task',
          value: task.value
        },
        {
          name: 'date',
          type: 'date',
          min: '2000-01-01',
          max: '2050-31-12',
          value: dataFormatada
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Save',
          handler: (alertData) => {
            if (alertData.task !== '') {
              this.taskService.updateTask(index, alertData.task, alertData.date);
            }
            else {
              this.presentToast();
              this.presentAlertPromptUpdate(index, task);
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPromptDelete(index: number) {
    const alert = await this.alertController.create({
      header: 'Delete task!',
      message: 'Do you really want to delete this task?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Delete',
          handler: () => this.taskService.removeTask(index)
        }
      ]
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: "You need to provide the task name!",
      duration: 2000,
      color: 'danger'
    });

    toast.present();
  }

   async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

}
