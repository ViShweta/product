import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { ServiceNameService } from '../service-name.service';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.page.html',
  styleUrls: ['./edit-password.page.scss'],
})
export class EditPasswordPage implements OnInit {

  passwordForm: FormGroup;
  submitted: boolean = false;
  loginData: any;
  viewlist: any = [];
  loginemail: any;
  passwordsMatch: boolean = false;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  password: string = 'password';
  passwordIco: string = 'eye-off';
  

  constructor(
    private route: Router,
    private storage: StorageService,
    private service: ServiceNameService,
  ) {
    this.passwordForm = new FormGroup({
      newpassword: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required]),
    });
  }

  onPasswordChange() {
    const newPassword = this.passwordForm.get('newpassword')?.value;
    const confirmPassword = this.passwordForm.get('confirmPassword')?.value;
    if (newPassword == confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  onSubmit(value: any) {
    console.log(value);
    // if (this.passwordsMatch) {
    //   console.log(value);
    //   this.service.presentAlert('Password Not Match !!');

      this.storage.getFromStorage('addUser').then((viewuser: any) => {
        if (viewuser != null) {
          this.viewlist = viewuser;
          console.log(viewuser);
          console.log(this.viewlist);
          let index = this.viewlist.findIndex((element: any) => element.email == this.loginData.email);
          console.log('Index:', index);
          if (index > -1) {
            this.viewlist[index].password = value.newpassword;
          }
          this.storage.setIntoStorage('addUser', this.viewlist).then(() => {
            this.service.presentAlert("Your Password Successfully Changed!!");
            this.route.navigate(['/']);
            this.passwordForm.reset('');
          })
        } else {
          console.log('Password Not Match !!');
          this.service.presentAlert('Password Not Match !!');
        }
      });
    // }
  }


  ngOnInit() {
    this.storage.getFromStorage('LoginUser').then((loginuser: any) => {
      console.log(loginuser);
      if (loginuser != null) {
        this.loginData = loginuser;
        console.log(this.loginData);
      }
    });
  }

  ShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  hideShowPassword() {
    this.password = this.password === 'text' ? 'password' : 'text';
    this.passwordIco = this.passwordIco === 'eye-off' ? 'eye' : 'eye-off';
  }
}
