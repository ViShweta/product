import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { ServiceNameService } from '../service-name.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginuser: any;
  LoginForm: FormGroup;
  constructor(
    private storage: StorageService,
    private route: Router,
    private service: ServiceNameService,
  ) {
    this.LoginForm = new FormGroup({

      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required,]),

    });
  }

  OnSubmit(value: any) {
    console.log(value);
    this.storage.getFromStorage('addUser').then((loginuser: any) => {
      console.log(loginuser);
      if (loginuser != null) {
        let index = loginuser.findIndex((element: any) => element.email == value.email && element.password == value.password);
        console.log(index);
        this.service.presentAlert("Login SucessFully !")
        if (index > -1) {
          this.route.navigate(['/home']);
          this.storage.setIntoStorage('LoginUser', (value)).then(() => {
            this.LoginForm.reset();
          });
        } else {
          console.log("Data not found!");
          this.service.presentAlert("Data Not Match !!")
        }
      }
    });




  }






  ngOnInit() {
  }

}
