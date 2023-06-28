import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { ServiceNameService } from '../service-name.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  EditForm: FormGroup;
  loginData: any;
  userlist: any[] = [];
  userData: any;
  loginemail: any;
  url: any = '';
  defaultImageUrl: string = 'https://www.w3schools.com/howto/img_avatar.png';
  img: any;

  constructor(
    private storage: StorageService,
    private service: ServiceNameService,
    private route: Router
  ) {
    this.EditForm = new FormGroup({
      name: new FormControl("", Validators.required),
      email: new FormControl({ value: "", disabled: true }), 
      address: new FormControl(""),
      phone: new FormControl("", Validators.pattern("[0-9]+"))
    });
  }

  OnSubmit(value: any) {
    console.log(value);
    
    if (value != null) {
      this.userData.name = value.name;
      this.userData.address = value.address;
      this.userData.phone=value.phone;
      if (this.url) {
        this.userData.imageUrl = this.url;
      }

      let index = this.userlist.findIndex((element: any) => element.email == this.loginData.email);
      if (index > -1) {
        this.service.presentAlert("Your profile was successfully updated!")
        this.userlist[index] = this.userData;
        this.storage.setIntoStorage('addUser', this.userlist).then(() => {
          this.route.navigate(['view/']);
        });
      }
    }
  }

  ngOnInit() {
    this.setDefaultPic();
    this.storage.getFromStorage('LoginUser').then((loginuser: any) => {
      console.log(loginuser);
      if (loginuser != null) {
        this.loginData = loginuser;
        console.log(this.loginData);
      }
    });

    this.storage.getFromStorage('addUser').then((viewuser: any) => {
      if (viewuser != null) {
        this.userlist = viewuser;
        console.log(viewuser);
        console.log(this.userlist);
        let index = this.userlist.findIndex((element: any) => element.email == this.loginData.email);
        console.log(index);
        if (index > -1) {
          console.log("Index/: ", index);
          this.userData = this.userlist[index];
          console.log("studentData:", this.userData);
          this.EditForm.patchValue(this.userData);
        }
      }
    });
  }

  setDefaultPic() {
    this.img = 'https://www.w3schools.com/howto/img_avatar.png';
  }

  openImageInput() {
    const input = document.createElement('input');
    input.type = 'file';
    input.addEventListener('change', (event: any) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.url = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
    input.click();
  }
}
