import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController , ToastController } from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the AddItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-item',
  templateUrl: 'category.html',
})
export class AddItemPage {
  category: any[] = [];
  viewType: string = "list";
  response: any[] = [];
  item: any;
  selectedWishList: any;

  constructor(public navCtrl: NavController, public http: Http,public navParams: NavParams,public loadingCtrl: LoadingController, public afDB: AngularFireDatabase ,private toastCtrl: ToastController ) {
    // this.selectedWishList = this.navParams.get('name'); 
    let loadingPopup = this.loadingCtrl.create({
      spinner: 'crescent',
      content: ''
    });
    loadingPopup.present();
     this.http.get("https://api.indix.com/v2/categories?app_key=gSNCvFYFCHEdTs24IGXIisPAbhYy5v0w").map(res => res.json())
     .subscribe(data => {  
       //console.log(data);
      this.response = data.result.categories;    
      console.log('Category is' + this.response);   
     // this.category = this.category.map(function(a) {return a["category"];});
     loadingPopup.dismiss()
    }, error => {
        console.log(JSON.stringify(error.json()));
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemPage');
  }

  openList(categoryId){
    console.log("Name path of category" + categoryId);
    this.navCtrl.push('ProductPage',{categoryId:categoryId}); 
  }
}
