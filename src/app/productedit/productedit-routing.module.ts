import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProducteditPage } from './productedit.page';

const routes: Routes = [
  {
    path: '',
    component: ProducteditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProducteditPageRoutingModule {}
