import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyproductPageRoutingModule } from './myproduct-routing.module';

import { MyproductPage } from './myproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyproductPageRoutingModule
  ],
  declarations: [MyproductPage]
})
export class MyproductPageModule {}
