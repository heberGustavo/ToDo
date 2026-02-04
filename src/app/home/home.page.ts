import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task-service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(
    public alertController: AlertController,
    private toastController: ToastController,
    private taskService: TaskService,
  ) {}
  
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
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Salvar',
          handler: (alertData) => {
            if(alertData.task !== '' && alertData.date !== ''){
              this.taskService.addTask(alertData.task, alertData.date);
            }
            else{
              this.presentToast();
              this.presentAlertPromptAdd();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async presentToast(){
    const toast = await this.toastController.create({
      message: "It's necessary info all fields!",
      duration: 2000,
      color: 'danger'
    });

    toast.present();
  }

}
