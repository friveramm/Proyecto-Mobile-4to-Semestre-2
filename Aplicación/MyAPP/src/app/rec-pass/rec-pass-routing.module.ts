import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecPassPage } from './rec-pass.page';

const routes: Routes = [
  {
    path: '',
    component: RecPassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecPassPageRoutingModule {}
