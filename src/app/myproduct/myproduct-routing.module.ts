import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyproductPage } from './myproduct.page';

const routes: Routes = [
  {
    path: '',
    component: MyproductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyproductPageRoutingModule {}
