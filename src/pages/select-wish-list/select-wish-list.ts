import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthData } from '../../providers/auth-data';
/**
 * Generated class for the SelectWishListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-wish-list',
  templateUrl: 'select-wish-list.html',
})
export class SelectWishListPage {
  myList: any[] = [];
  productId: any;
  brandName: any;
  indexOfList: number;
  existingList: any[] = [];
  categoryId: any;
  
  constructor(public navCtrl: NavController,public authData:AuthData,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase ,private toastCtrl: ToastController ) {
    this.productId = this.navParams.get('mpId'); 
    this.brandName = this.navParams.get('brandName'); 
    this.categoryId = this.navParams.get('categoryId');

    console.log('product Id + brandName');


    this.afDB.list('/users/' + this.authData.store_uid + '/myList', {query: {}}).subscribe(mylist => {
      this.myList = mylist;                
      console.log("list is " + this.myList);      
    });      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectWishListPage');
  }


  openList(selectedList)
  {       
    // this.afDB.list('/users/' + this.authData.store_uid + '/myList/itemIds', {query: {}}).subscribe(itemList => {
    //   this.itemList = itemList;                
    //   console.log("list is " + this.itemList);      
    // }); 

    this.indexOfList = this.myList.findIndex(c => c.name === (selectedList))
    console.log('Index Of ' +  this.indexOfList);

    this.afDB.list('/users/' + this.authData.store_uid + '/myList/' +this.indexOfList + '/itemIds', {query: {}}).subscribe(itemList => {
      this.existingList = itemList;                
      console.log("list is " + this.existingList);      
    }); 

    console.log('Length ' +  this.existingList.length);
    this.authData.addItemToWishList(this.indexOfList,this.productId, this.brandName, this.existingList.length); 
    this.navCtrl.push('ProductPage',{categoryId:this.categoryId}); 
  }

}
