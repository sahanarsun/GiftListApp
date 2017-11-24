import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
//import * as firebase from 'firebase/app';
import { AuthData } from '../../../../providers/auth-data';
import firebase from 'firebase';
import { Device } from '@ionic-native/device';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public loginForm: any;
  public backgroundImage: any = "./assets/bg1.jpg";
  public imgLogo: any = "./assets/medium_150.70391061453px_1202562_easyicon.net.png";
  public deviceId : any;

  constructor(public navCtrl: NavController,private device: Device, public authData: AuthData, public fb: FormBuilder, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    
    authData.startTracking();
    
    
    console.log('Device serial number is: ' + this.device.uuid);
    this.deviceId = this.device.uuid;
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEXP)])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  ionViewDidEnter() {
    var processFbLogin: string = localStorage.getItem("processFbLogin");
    if (processFbLogin == "true") {
      var self = this;
      let loadingPopup = self.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Loading...'
      });
      loadingPopup.present();
      firebase.auth().getRedirectResult().then(function (result) {

        if (result.credential) {
          var fbUserInfo = JSON.stringify(result);
          var myObj = JSON.parse(fbUserInfo).user;
          
          console.log('UserPassword ' + myObj.uid + '\n disnameName ' + myObj.displayName + '\n displayEmail ' + myObj.email);
          var username: string = myObj.displayName;
          var userEmail: string = myObj.email;
          var userPassword: string = myObj.uid;
          var userPhoneNumber: number = 1234567890;

          self.authData.registerUser(username, userEmail, userPassword, userPhoneNumber)
            .then(() => {
              loadingPopup.dismiss();
             self.navCtrl.setRoot('Category2Page');
            }, (error) => {
              loadingPopup.dismiss();
              self.navCtrl.setRoot('Category2Page');

              //   self.authData.loginUser(userEmail, userPassword)
              //  .then(authData => {
              //   console.log("Auth pass " + authData.uid+ "hello"+ authData.email);
              //   this.authData.storeUid(authData.uid);
              //   loadingPopup.dismiss();
              //   console.log('Succcess of datat');
              //   this.navCtrl.setRoot('Category2Page');

              // }, error => {
              //   var errorMessage: string = error.message;
              //   loadingPopup.dismiss().then( () => {
              //     console.log('error of Login');
              //     loadingPopup.dismiss();
              //       self.presentAlert(errorMessage)
              //   });
              // });


            });
        }
      }).catch(function (error) {
        console.log(error.message);
      });

      localStorage.setItem("processFbLogin", "false");
    }
  }

  loginWithFacebook() {
    console.log("fb login starting");
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    localStorage.setItem("processFbLogin", "true");
    
  }

  login() {
    if (!this.loginForm.valid) {

      console.log("error");
    } else {
      let loadingPopup = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Loading...'
      });
      loadingPopup.present();

      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then(authData => {
          console.log("Auth pass " + authData.uid);
          this.authData.storeUid(authData.uid);
          loadingPopup.dismiss();
          this.navCtrl.setRoot('Category2Page');
        }, error => {
          var errorMessage: string = error.message;
          loadingPopup.dismiss().then(() => {
            this.presentAlert(errorMessage)
          });
        });
    }
  }

  forgot() {
    this.navCtrl.push('ForgotPage');
  }

  createAccount() {
    this.navCtrl.push('RegisterPage');
  }
  presentAlert(title) {
    let alert = this.alertCtrl.create({
      title: title,
      buttons: ['OK']
    });
    alert.present();
  }

}