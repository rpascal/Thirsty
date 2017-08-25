import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { GoogleMapsProvider } from '../providers/googleMaps/google-maps/google-maps';
import { BusinessesDataProvider } from '../providers/businesses-data/businesses-data';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { CurrentLocationProvider } from '../providers/current-location/current-location';
import { MathOperationsProvider } from '../providers/math-operations/math-operations';
import { GoogleMapPlacesProvider } from '../providers/googleMaps/google-map-places/google-map-places';

import { Network } from '@ionic-native/network';
import { Geolocation } from '@ionic-native/geolocation';

import {MapSettingsComponent} from '../components/map-settings/map-settings'
import { ENVIRONMENT } from '../environments/environment.default'


@NgModule({
  declarations: [
    MyApp,
    MapSettingsComponent
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(ENVIRONMENT.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapSettingsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Network,
    Geolocation,
    GoogleMapsProvider,
    BusinessesDataProvider,
    ConnectivityServiceProvider,
    CurrentLocationProvider,
    MathOperationsProvider,
    GoogleMapPlacesProvider
  ]
})
export class AppModule { }
