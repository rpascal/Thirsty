import { latLng } from './../../models/latLng';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class MathOperationsProvider {

  constructor() {
    console.log('Hello MathOperationsProvider Provider');
  }


  applyHaversine(locations, currentPosition: latLng) {
    let usersLocation: latLng = {
      lat: currentPosition.lat,
      lng: currentPosition.lng
    };
    locations.map((location) => {
      let placeLocation = {
        lat: location.lat,
        lng: location.lng
      };
      location.distance = this.getDistanceBetweenPoints(
        usersLocation,
        placeLocation,
        'miles'
      ).toFixed(2);
    });
    return locations;
  }
  getDistanceBetweenPoints(start: latLng, end: latLng, units) {
    let earthRadius = {
      miles: 3958.8,
      km: 6371
    };
    let R = earthRadius[units || 'miles'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;
    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
  }

  toRad(x) {
    return x * Math.PI / 180;
  }

  mileToMeter(m) {
    return m * 1609.344;
  }


}
