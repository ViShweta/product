import { Component } from '@angular/core';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage : StorageService,
    private route :Router
  ) {

    this.storage.getFromStorage('LoginUser').then((data:any)=>{
      console.log(data);
      if (data != undefined) {
        this.route.navigate(['/home']);
        }else{
          this.route.navigate(['/login']);
       }
    });

   
    
   
    
  }
}
