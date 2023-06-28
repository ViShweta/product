import { Component, OnInit } from '@angular/core';
import { ServiceNameService } from '../service-name.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';




@Component({
  selector: 'app-myproduct',
  templateUrl: './myproduct.page.html',
  styleUrls: ['./myproduct.page.scss'],
})
export class MyproductPage implements OnInit {
  loginEmail:any;
  MyPro:any = [];
  showProd:any=[];
  data:any;
  constructor(
    private storage:StorageService,
    private service:ServiceNameService,
    private router :Router,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl:AlertController,
    private route: ActivatedRoute
  ) { 
    
    // this.data = this.router.getCurrentNavigation()?.extras.state;
    // this.showProd = this.data;
    // console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  ngOnInit() {
    this.storage.getFromStorage('LoginUser').then((loginuser: any) => {
      console.log(loginuser);
      if (loginuser != null) {
        this.loginEmail = loginuser;
        console.log("loginEmail:",this.loginEmail);
      }
 
    this.storage.getFromStorage('Products').then((userPro: any) => {
      console.log("userPro:",userPro);
      if (userPro != null) {
        this.MyPro = userPro;
        console.log("MyPro:",this.MyPro );
        this.MyPro.forEach((element:any) => {
          if(element.email==this.loginEmail.email)
          this.showProd.push(element); 
        });
        console.log('p:',this.showProd);
      }
    });
  });

  }


  async presentActionSheet(index:any,singale :any) {
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            this.router.navigate(['/addproduct/'+index], {state: singale});
            console.log('singale:',singale);
          }
        },
        {
          text: 'Delete',
          icon: 'trash',
          role: 'destructive',
           handler: () => {
            this.removePost(index);
            console.log('p:',index)
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

  async removePost(product: any) {
    const alert = await this.alertCtrl.create({
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
              this.showProd.splice(product, 1);
              this.storage.setIntoStorage('Products', this.showProd);
            
          },
        },
      ],
    });
    await alert.present();
  }
}  
