import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../services/storage.service';
import { ActivatedRoute, Router, RouterState, NavigationExtras } from '@angular/router';
import { ServiceNameService } from '../service-name.service';


@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.page.html',
  styleUrls: ['./addproduct.page.scss'],
})
export class AddproductPage implements OnInit {
  productForm: FormGroup;
  currentNumber = 1;
  quantity: any;
  currentQuantity: any;
  addproduct: any;
  loginUser: any;
  loginData: any;
  id: any;
  userdata: any;
  productlist: any = [];
  index: any;

  constructor(
    private storage: StorageService,
    private route: Router,
    private service: ServiceNameService,
    private router: ActivatedRoute,
  ) {

    this.userdata = this.route.getCurrentNavigation()?.extras?.state;
    console.log('pro:', this.userdata);

    this.productForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      quantity: new FormControl(1),
    });

    this.storage.getFromStorage('LoginUser').then((loginuser: any) => {
      console.log(loginuser);
      if (loginuser != null) {
        this.loginData = loginuser;
        console.log(this.loginData);
      }
    });




  }


  ngOnInit() {

    this.index = this.router.snapshot.paramMap.get('id');
    console.log(this.index);

    // this.index=this.index !==null ?

    if (this.userdata) {
      this.productForm.controls['title'].setValue(this.userdata.title);
      this.productForm.controls['description'].setValue(this.userdata.description);
      this.productForm.controls['quantity'].setValue(this.userdata.quantity);
    }

    this.storage.getFromStorage('LoginUser').then((loginuser: any) => {
      console.log(loginuser);
      if (loginuser != null) {
        this.loginData = loginuser;
        console.log(this.loginData);
      }
    });


  }

  onSubmit(value: any) {
    console.log(value);
    value.email = this.loginData.email;
    this.storage.getFromStorage('Products').then((addproduct: any[]) => {
      console.log(addproduct);
      if (addproduct) {
        if (this.index !== null) {
          // let index=this.addproduct.findIndex((element:any) =>element.email== value.email)
          // console.log('index',index);
          addproduct[this.index] = value;
          console.log(value)
        } else {
          addproduct.push(value);
        }
        this.storage.setIntoStorage('Products', addproduct).then(() => {
          this.route.navigate(['/']);
        });
      } 
      else {
        addproduct = [value];
        this.storage.setIntoStorage('Products', addproduct).then(() => {
          this.route.navigate(['/']);
        });
      }
    });
  }









  public increment() {
    this.quantity = this.productForm.get('quantity');
    this.currentQuantity = this.quantity.value;
    this.currentQuantity++;
    console.log(this.currentQuantity)
    this.quantity.setValue(this.currentQuantity);
  }

  public decrement() {
    if (this.currentQuantity > 1) {
      this.currentQuantity--;
    }
    this.quantity.setValue(this.currentQuantity);
    console.log(this.currentQuantity);
  }



}
