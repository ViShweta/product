import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ServiceNameService } from '../service-name.service';
import { IonInput } from '@ionic/angular';



@Component({
  selector: 'app-verify-password',
  templateUrl: './verify-password.page.html',
  styleUrls: ['./verify-password.page.scss'],
})
export class VerifyPasswordPage implements OnInit {
  password: FormGroup;
  userlist: any[] = [];
  loginEmail: any;
  userPassword: any;
  enteredPassword:any;
  showPassword:any;
  passwordType: string = 'password';
 passwordIcon: string = 'eye-off';
 
  constructor(
    private storage: StorageService,
    private route: Router,
    private service:ServiceNameService,
    
  ) {
    this.password = new FormGroup({
      changepassword: new FormControl('', Validators.required),
    });



    this.storage.getFromStorage('LoginUser').then((loginuser: any) => {
      if (loginuser !=null) {
        this.loginEmail = loginuser;
      }
      console.log(this.loginEmail);    
    });

  }

  onSubmit(value:any) {
    console.log(value);
    console.log(this.loginEmail.password)
    
    if (value.changepassword == this.loginEmail.password) {
      console.log(value);
      this.service.presentToaster("Your Password Succesfully Verify !!")
      this.route.navigate(['/edit-password']);
    } else {
      console.log('Passwords do not match');
      this.service.presentToaster(" Please Enter Correct Password !!")
      
    }
  }
  
  


  ngOnInit() {

    this.showPassword= 'password';


    
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
}
}
