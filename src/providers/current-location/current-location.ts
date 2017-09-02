import { latLng } from './../../models/latLng';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class CurrentLocationProvider {

  private currentLocation: latLng;

  constructor(public geolocation: Geolocation) {
    this.geolocation.watchPosition().subscribe(data => {
     console.log(data)
      this.currentLocation = { lat: data.coords.latitude, lng: data.coords.longitude };
    });
  }

  getDefault() : latLng{
    //new york
    return { lat: 41.059481, lng: -82.023820 };
  }

  watchLocation() {
    return this.geolocation.watchPosition();
  }


  getCurrentocation(): Promise<latLng> {
    if (this.currentLocation) {
      return Promise.resolve(this.currentLocation)
    }
    return new Promise(resolve => {
      this.geolocation.getCurrentPosition().then(currentLocation => {
        resolve({ lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude })
      }).catch(err => {
        resolve(this.getDefault())
      });

    });

  }






}
