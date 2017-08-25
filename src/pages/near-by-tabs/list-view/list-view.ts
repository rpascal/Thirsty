import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, LoadingController, Loading } from 'ionic-angular';
import { BusinessesDataProvider } from '../../../providers/businesses-data/businesses-data'
// import { Geolocation } from '@ionic-native/geolocation';

import { CurrentLocationProvider } from '../../../providers/current-location/current-location';
import { GoogleMapsProvider } from '../../../providers/googleMaps/google-maps/google-maps'


@IonicPage()
@Component({
  selector: 'page-list-view',
  templateUrl: 'list-view.html',
})
export class ListViewPage {

  businesses = [];
  businessesSub;

  constructor(public bdp: BusinessesDataProvider, public navCtrl: NavController,
    public zone: NgZone, public navParams: NavParams, public loadingCtrl: LoadingController,
    public events: Events, public curLoc: CurrentLocationProvider, public maps: GoogleMapsProvider) {
  }

  ionViewDidLoad() {
    this.initBusinessesList();
  }

  selectBusiness(business) {
    this.navCtrl.push("BusinessPromosPage", { key: business._uid });
  }


  
  initBusinessesList() {
    this.businessesSub = this.maps.getMapDataPoints();

    // this.maps.getMapDataPoints().subscribe(data => {
    //   console.log("list sub", data)
    //   const loader = this.loadingCtrl.create({
    //     content: 'Please wait...'
    //   });
    //   loader.present()
    //   this.zone.run(() => {
    //     this.businesses = [];
    //     this.businesses = data;
    //     loader.dismiss();
    //   });
    // })

  }
  public identify(index, item) {
    return item._uid;
  }

}
