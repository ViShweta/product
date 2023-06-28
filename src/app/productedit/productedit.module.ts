import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProducteditPageRoutingModule } from './productedit-routing.module';

import { ProducteditPage } from './productedit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProducteditPageRoutingModule
  ],
  declarations: [ProducteditPage]
})
export class ProducteditPageModule {}
