import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelectWishListPage } from './select-wish-list';

@NgModule({
  declarations: [
    SelectWishListPage,
  ],
  imports: [
    IonicPageModule.forChild(SelectWishListPage),
  ],
  exports: [
    SelectWishListPage
  ]
})
export class SelectWishListPageModule {}
