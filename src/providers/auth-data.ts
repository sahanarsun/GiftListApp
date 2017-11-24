import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import * as firebase from 'firebase/app';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@Injectable()
export class AuthData {
  public store_uid : string;
  constructor(public afAuth: AngularFireAuth,private analytics: GoogleAnalytics) {
  }

  checkUser(){
    this.afAuth.authState.subscribe(res => {
    if (res && res.uid) {
      return true;
    } else {
      return false;
    }
  });
  }

  loginUser(newEmail: string, newPassword: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(newEmail,newPassword)
  }

  resetPassword(email: string): firebase.Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }

  registerUser(name: string, email: string, password: string, phone: number): firebase.Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
      firebase.database().ref('/users').child(newUser.uid).set({          
          email: email,
          name: name,
          phone: phone     
      });
    });
  }

  storeUid(uid: string)
  {
    this.store_uid = uid;
  }
  
  createWishList(type: string, name: string, listCount: any, navCtrl: NavController) {   
    firebase.database().ref('/users/' + this.store_uid + "/myList").child(listCount).update({
      type: type,
      name: name     
    });  
    navCtrl.setRoot('Category2Page');
  }
  addItemToWishList(selectedList :number ,mpId: any, brandName: any, listCount: any) {   
    console.log("coming till here ");  
    firebase.database().ref('/users/' + this.store_uid + "/myList/" + selectedList + "/itemIds").child(listCount).update({
      mpId: mpId,
      brandName: brandName     
    });  
  }

  startTracking()
  {
   this.analytics.startTrackerWithId('UA-110137875-1')
   .then(() => {
     console.log('Google analytics is ready now');
        this.analytics.trackView('test');
     // Tracker is ready
     // You can now track pages or set additional information such as AppVersion or UserId
   })
   .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

}



// return this.afAuth.auth.createUserWithEmailAndPassword(email, password).then((newUser) => {
  
//          this.afDB.list('/GiftListTypes', {query: {}}).subscribe(giftListTypeData => {
//           this.giftListType = giftListTypeData;
//           console.log("Types are " + this.giftListType[0].name);
//         });
  
//         firebase.database().ref('/users').child(newUser.uid).set({
//             email: email,
//             name: name,
//             phone: phone
//         });
//       });


// setDeafultList(){  
//   firebase.database().ref('/users/' + this.store_uid +'/myList').set({          
//     0: 0           
//   });    
// firebase.database().ref('/users/' + this.store_uid +'/friendList').set({          
//   0: 0       
//   });
// }

// createWishList(list: any[]) {   
//   firebase.database().ref('/users/' + this.store_uid + "/myList").update({
//     list: list 
//   });  
//   console.log("Created db " + list + name)
// }
