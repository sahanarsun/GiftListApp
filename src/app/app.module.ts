import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//*********** ionic Native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Device } from '@ionic-native/device';
import { MyApp } from './app.component';

//***********  Angularfire2 v4 **************/

import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


//*********** Provider **************/
import { AuthData } from '../providers/auth-data';
import { RadioPlayer } from '../providers/radio-service';
import { HttpModule } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

//*********** Image Gallery **************/
import { GalleryModal } from 'ionic-gallery-modal';
import { ZoomableImage } from 'ionic-gallery-modal';


//********** firebase configuration  ************ */
export const config = {
    apiKey: "AIzaSyDGtG9rU1-3WwXL2nGWvfA04qhGEAaQEvs",
    authDomain: "purche-73d48.firebaseapp.com",
    databaseURL: "https://purche-73d48.firebaseio.com",
    projectId: "purche-73d48",
    storageBucket: "purche-73d48.appspot.com",
    messagingSenderId: "904763409926"
  };


@NgModule({
  declarations: [
    MyApp,
    GalleryModal,
    ZoomableImage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GalleryModal,
    ZoomableImage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthData,
    RadioPlayer,
    HTTP,
    Device,
    GoogleAnalytics
  ]
})
export class AppModule {}
