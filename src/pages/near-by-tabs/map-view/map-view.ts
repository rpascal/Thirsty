import { NavController, Platform, ViewController, IonicPage, PopoverController } from 'ionic-angular';
import { Component, ElementRef, ViewChild, NgZone } from '@angular/core';
import { GoogleMapsProvider } from '../../../providers/googleMaps/google-maps/google-maps';
import { CurrentLocationProvider } from '../../../providers/current-location/current-location'
import { GoogleMapPlacesProvider } from '../../../providers/googleMaps/google-map-places/google-map-places'
import { MapSettingsComponent } from '../../../components/map-settings/map-settings'



import { ENVIRONMENT } from '../../../environments/environment.default'
declare var google;

@IonicPage()
@Component({
  selector: 'page-map-view',
  templateUrl: 'map-view.html',
})
export class MapViewPage {

  places: any = [];
  query: string;

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;

  constructor(public navCtrl: NavController, public maps: GoogleMapsProvider, public zone: NgZone,
    public currentLocation: CurrentLocationProvider, public googleMapPlaces: GoogleMapPlacesProvider,
    public popover: PopoverController) {

    console.log("test")

  }


  ionViewDidLoad() {

    Promise.all([
      this.currentLocation.getCurrentocation(),
      this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, this.navCtrl)
    ]).then(data => {
      var curLoc = data[0];
      this.googleMapPlaces.init(this.maps.getMap());
      this.maps.setCenter(curLoc);
    })

  }


  searchPlace() {
    this.googleMapPlaces.search(this.query).then(res => {
      this.zone.run(() => {
        this.places = [];
        this.places = res;
      })
    })

  }
  selectPlace(place) {

    this.googleMapPlaces.getSelectedPlaceDetails(place).then(res => {
      this.maps.changeLocation({ lat: res.lat, lng: res.lng });
      this.zone.run(() => {
        this.places = [];
        this.maps.setCenter(res)
      });
    });


  }

  openSettings(ev) {
    let popover = this.popover.create(MapSettingsComponent, {
      page: this,
    });

    popover.present({
      ev: ev
    });


  }


}
