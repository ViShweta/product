import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerifyPasswordPageRoutingModule } from './verify-password-routing.module';

import { VerifyPasswordPage } from './verify-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VerifyPasswordPageRoutingModule
  ],
  declarations: [VerifyPasswordPage]
})
export class VerifyPasswordPageModule {}
