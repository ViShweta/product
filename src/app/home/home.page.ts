import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { ServiceNameService } from '../service-name.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  viewlist: any = [];
  product:any;
  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private storage: StorageService,
    private service: ServiceNameService
  ) {






  }

  
  ionViewDidEnter() {
    this.loadProudct();
  }

  loadProudct(){
    this.storage.getFromStorage('Products').then((saveproduct:any)=>{
      if(saveproduct !=null){
        this.product=saveproduct;
      }else {
        this.service.presentAlert('No  found. Please add a product.');
      }
    })
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'My Profile',
          handler: () => {
            this.router.navigate(['/view']);
          }
        },
        {
          text: 'My Product',
          handler: () => {
            this.router.navigate(['/myproduct']);
          }
        },
        {
          text: 'Logout',
          handler: () => {
            this.storage.removeFromStorage('LoginUser');
            this.service.presentAlert("Logout SucessFully !!")

            this.router.navigate(['/login']);
          }
        },
       
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }


}