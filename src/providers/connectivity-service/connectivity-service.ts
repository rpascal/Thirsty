import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform, ToastController } from 'ionic-angular';

declare var Connection;


@Injectable()
export class ConnectivityServiceProvider {

  onDevice: boolean;

  constructor(public platform: Platform, public network: Network,public toast : ToastController) {
    this.onDevice = this.platform.is('cordova');
  }
  toastMes(message) {
    this.toast.create({ message: message, duration: 1000 }).present();
  }

  isOnline(): boolean {
    this.toastMes("is onlines" + this.onDevice + " " + this.network.type)
    // this.toastMes(this.onDevice )
    // this.toastMes(this.onDevice )
    
    if (this.onDevice && this.network.type) {
      this.toastMes("true" + this.network.type)
      
      return this.network.type !== Connection.NONE;
    } else {
      this.toastMes("false" + navigator.onLine)

      return navigator.onLine;
    }
  }

  isOffline(): boolean {
    if (this.onDevice && this.network.type) {
      return this.network.type === Connection.NONE;
    } else {
      return !navigator.onLine;
    }
  }
  watchOnline(): any {
    return this.network.onConnect();
  }

  watchOffline(): any {
    return this.network.onDisconnect();
  }

}
