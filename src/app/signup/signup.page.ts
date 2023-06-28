import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ServiceNameService } from '../service-name.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  UserLogin: any = [];
  userForm: FormGroup;
  constructor(
    private storage: StorageService,
    private route: Router,
    private service: ServiceNameService,
  ) {
    this.userForm = new FormGroup({

      name: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,]),
      address: new FormControl(""),
      phone: new FormControl("", Validators.pattern("[0-9]+"))

    });
  }


  OnSubmit(value: any) {
    console.log(value);

    this.storage.getFromStorage('addUser').then((createuser: any) => {
      if (createuser != null) {
        let index = createuser.findIndex((element: any) => element.email == value.email);
        if (index > -1) {
          console.log(index);
          this.service.presentAlert("Email already registered.");
        } else {
          console.log('sign:', createuser);
          createuser = [...createuser, value];
          this.UserLogin.push(value);
          this.storage.setIntoStorage('addUser', createuser);
          this.service.presentAlert(" Your Account registered successfully.");
          this.route.navigate(['login/'])
        }
      } else {
        this.UserLogin.push(value);
        this.service.presentAlert(" Your Account registered successfully.");
        this.storage.setIntoStorage('addUser', [value]);
        this.route.navigate(['login/'])
      }
    });
  }



  ngOnInit() {
  }

}
