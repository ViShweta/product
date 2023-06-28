import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss'],
})
export class ViewPage  {

  viewlist: any = [];
  results: any;
  userData: any;
  dataemail:any;
  loginemail: any;
  viewuser:any;
  loginData:any;
  url:any;
  img:any;
  defaultImageUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';
  constructor(
    private storage: StorageService,
  ) { }


  ionViewWillEnter() {
    this.Viewall();
    this.setDefaultPic();
  }
  

  Viewall() {

    this.storage.getFromStorage('LoginUser').then((loginuser:any) => {
      console.log(loginuser);
      if(loginuser !=null){
        this.loginData=loginuser;
        console.log(this.loginData);
        
      }
      

    })
    this.storage.getFromStorage('addUser').then((viewuser: any) => {
      if (viewuser != null) {
        this.viewlist = viewuser;
        console.log(viewuser);
        console.log(this.viewlist); 
        let index = this.viewlist.findIndex((element: any) => element.email == this.loginData.email);
        console.log(this.loginemail);
        if (index > -1) {
          console.log("Index/: ", index);
          this.userData = this.viewlist[index];
          console.log("studentData:", this.userData);
        } else {
         
        }
      }
    });
  }


  setDefaultPic() {
    this.img = 'https://www.w3schools.com/howto/img_avatar.png';
  }
  
 
  // onSelectFile(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); 

  //     reader.onload = (event: any) => { 
  //       console.log(event);
  //       this.url = event.target.result;
  //     }
  //   }
  // }
  
}










