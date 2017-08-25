import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ENVIRONMENT } from '../../environments/environment.default'

@IonicPage()
@Component({
  selector: 'page-near-by-tabs',
  templateUrl: 'near-by-tabs.html',
})
export class NearByTabsPage {

  list = "ListViewPage";
  map = "MapViewPage";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NearByTabsPage', JSON.stringify(ENVIRONMENT, null, 2));
  }

}
