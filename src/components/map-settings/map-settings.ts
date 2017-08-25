import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { GoogleMapsProvider } from '../../providers/googleMaps/google-maps/google-maps'


@Component({
  selector: 'map-settings',
  templateUrl: 'map-settings.html'
})
export class MapSettingsComponent {

  radius = this.GoogleMapsProvider.defaultRadius;

  public constructor(public GoogleMapsProvider: GoogleMapsProvider, public ViewController: ViewController) {
  }

  searchThisArea() {
    var center = this.GoogleMapsProvider.getMapCenter()
    this.GoogleMapsProvider.setCenter(center);
    this.ViewController.dismiss();
  }

  changeRadius($event) {
    this.GoogleMapsProvider.changeRadius($event)
    this.ViewController.dismiss();
  }

}
