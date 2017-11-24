import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthData } from '../../providers/auth-data';


/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
  response: any[] = [];
  categoryId: any;
  itemList: any[]=[];
  myList: any[] = [];
  selectedList: any;

  constructor(public navCtrl: NavController,public authData:AuthData, public http: Http,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase ,private toastCtrl: ToastController ) {
     this.categoryId = this.navParams.get('categoryId'); 
    // this.selectedWishList = this.navParams.get('selectedWishList');
    this.afDB.list('/users/' + this.authData.store_uid + '/myList', {query: {}}).subscribe(mylist => {
      this.myList = mylist;                
      //console.log("list is " + this.myList);      
    });      
    this.http.get("https://api.indix.com/v2/summary/products?countryCode=US&categoryId=10161&pageNumber=1&pageSize=10&app_key=gSNCvFYFCHEdTs24IGXIisPAbhYy5v0w").map(res => res.json())
    .subscribe(data => {
     this.response = data.result.products;    
     console.log('products are' + this.response);   
   }, error => {
       console.log(JSON.stringify(error.json()));
   });  
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  openList(mpId,brandName)
  {       
   
    // this.authData.addItemToWishList(mpId, brandName, this.itemList.length); 
  }

  addProductTo(mpId,brandName)
  {
    this.afDB.list('/users/' + this.authData.store_uid + '/myList/itemIds', {query: {}}).subscribe(itemList => {
      this.itemList = itemList;                
      console.log("list is " + this.itemList);      
    });          
    console.log("length is product select " + this.itemList.length + mpId + brandName);   
    this.navCtrl.push('SelectWishListPage',{mpId:mpId,brandName:brandName}); 
     // this.authData.addItemToWishList(this.selectedList,mpId, brandName, this.itemList.length); 

  }
}
