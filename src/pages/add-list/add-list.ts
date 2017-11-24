import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import { AngularFireDatabase} from 'angularfire2/database';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';

/**
 * Generated class for the AddListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-list',
  templateUrl: 'add-list.html',
})
export class AddListPage {  
  public wishListForm;
  giftListType: any[] = [];
  selectedType: any;
  myListCount: any;
  inputName: any;
  list: any[];
  myList: any[] = [];
  

  constructor(public navCtrl: NavController, public authData:AuthData, public navParams: NavParams, public fb: FormBuilder, public loadingCtrl: LoadingController, 
    public afDB: AngularFireDatabase) {     
      this.wishListForm = fb.group({
      wishListName: ['', Validators.compose([Validators.minLength(2), Validators.required])],      
    });

    this.afDB.list('/users/' + this.authData.store_uid + '/myList', {query: {}}).subscribe(mylist => {
      this.myList = mylist;                
      //console.log("list is " + this.myList);      
    });  


      this.afDB.list('/GiftListTypes', {query: {}}).subscribe(giftListTypeData => {
        this.giftListType = giftListTypeData;
        console.log("Types are " + this.giftListType[0].name);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddListPage');
  }

  selectedListType(listType)
  {
      console.log("selected" + listType);
      this.selectedType = listType;
  }

  getTheValue()
  {
        console.log("name is " +  this.wishListForm.value.wishListName); 
    
    this.afDB.list('/users/' + this.authData.store_uid + '/myList', {query: {}}).subscribe(mylist => {
      this.myList = mylist;                
      //console.log("list is " + this.myList);      
    });          
    console.log("length is " + this.myList.length + this.authData.store_uid);     
    this.authData.createWishList(this.selectedType, this.wishListForm.value.wishListName, this.myList.length,
      this.navCtrl);    

  }
}
