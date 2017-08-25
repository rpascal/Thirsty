import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {ENVIRONMENT} from "../../environments/environment.default"

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    console.log(ENVIRONMENT.environment)
  }

}
