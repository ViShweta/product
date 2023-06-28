import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { StorageService } from './services/storage.service';


@Injectable({
  providedIn: 'root'
})
export class ServiceNameService {

  msg:any;
  handlerMessage = '';
  showProd:any=[];

  constructor(
    private toastController: ToastController,
    private alertController:AlertController,
    private storage:StorageService
  ) { }

  async presentToaster(msg : any){
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
    });

    await toast.present();
  }
  async presentAlert(msg:any) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: () => {
            this.handlerMessage = 'Alert canceled';
          },
        },
        ],
      
    });

    await alert.present();
  }



  async removePorduct(product: any) {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            alert.dismiss();
          },
        },
        {
          text: 'Okay',

          handler: () => {

            const index = this.showProd.indexOf(product);
            this.showProd.splice(index, 1);
            this.storage.setIntoStorage('Products', this.showProd);
          },
        },
      ],
    });
    await alert.present();
  }

}