import { ENVIRONMENT } from './../../../environments/environment.default';
import { latLng } from './../../../models/latLng';
import { Subscription } from 'rxjs/Subscription';
import { Injectable, NgZone } from '@angular/core';
import { Platform, ToastController, ToastOptions } from 'ionic-angular';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/take';
import { MathOperationsProvider } from '../../math-operations/math-operations'
import { ConnectivityServiceProvider } from '../../connectivity-service/connectivity-service';
import { CurrentLocationProvider } from '../../current-location/current-location'
import { BusinessesDataProvider } from '../../businesses-data/businesses-data'
declare var google;





@Injectable()
export class GoogleMapsProvider {
  private locationCircle;
  private navCtrl: any;
  private mapElement: any;
  private pleaseConnect: any;
  private map: any;
  private mapInitialised: boolean = false;
  private mapLoaded: any;
  private mapLoadedObserver: any;
  private location: BehaviorSubject<latLng> = new BehaviorSubject(this.currentLocationDataProvider.getDefault());

  public defaultRadius = 200;
  private radius: BehaviorSubject<number> = new BehaviorSubject(this.defaultRadius);

  private manualLocationChange = false;
  private currentMarkers: any[] = [];

  constructor(public connectivityService: ConnectivityServiceProvider,
    public businessDataProvider: BusinessesDataProvider,
    public zone: NgZone,
    public currentLocationDataProvider: CurrentLocationProvider,
    public math: MathOperationsProvider,
    public toast: ToastController) {

    this.currentLocationDataProvider.getCurrentocation().then(data => {
      this.location.next(data)
    })
    currentLocationDataProvider.watchLocation().subscribe(data => {
      if (!this.manualLocationChange)
        this.location.next({ lat: data.coords.latitude, lng: data.coords.longitude })
    })
  }

  toastMes(message) {
    this.toast.create({ message: message, duration: 1000 }).present();
  }

  init(mapElement: any, pleaseConnect: any, navCtrl): Promise<any> {

    this.toastMes("inti")

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    this.navCtrl = navCtrl;
    return this.loadGoogleMaps();
  }


  setCenter(newCenter: latLng) {
    this.changeLocation(newCenter);
    this.getMap().setCenter(newCenter);
  }

  changeLocation(newLocation: latLng) {
    this.manualLocationChange = true;
    this.locationCircle.setCenter(new google.maps.LatLng(newLocation.lat, newLocation.lng));
    this.location.next(newLocation);
  }


  getMapDataPoints() {
    return Observable.combineLatest(this.businessDataProvider.getBusinesses(), this.location, this.radius, (x, y, z) => ({ x, y, z })).map(data => {
      let temp = this.math.applyHaversine(data.x, data.y);
      temp.sort((locationA, locationB) => {
        return locationA.distance - locationB.distance;
      });
      return temp.filter((item) => +item.distance <= data.z);
    });
  }

  getMap() {
    return this.map;
  }
  getMapCenter(): latLng {
    var center = this.getMap().getCenter();
    return { lat: center.lat(), lng: center.lng() };
  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if (typeof google == "undefined" || typeof google.maps == "undefined") {

        this.toastMes("no google")


        this.disableMap();
        this.toastMes("is online!" + this.connectivityService.isOnline())
        if (this.connectivityService.isOnline()) {
          this.toastMes("pre weird")
          window['mapInit'] = () => {

            this.toastMes("map init callback")


            this.initMap().then(() => {
              this.toastMes("inti map done")

              this.enableMap();
              resolve(true);
            });


          }
          this.toastMes("pre script make")
          
          let script = document.createElement("script");
          script.id = "googleMaps";

          if (ENVIRONMENT.googleMapsAPIKey) {
            script.src = 'http://maps.google.com/maps/api/js?key=' + ENVIRONMENT.googleMapsAPIKey + '&callback=mapInit&libraries=places';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
          }

          document.body.appendChild(script);

        }
      } else {
        if (this.connectivityService.isOnline()) {
          this.initMap().then(init => {
            this.enableMap();
            resolve(true);
          });

        }
        else {
          this.disableMap();
        }
      }

      this.addConnectivityListeners();

    });

  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {
      let mapOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.map = new google.maps.Map(this.mapElement, mapOptions);
      this.toastMes("map made")
      
      resolve(true);
    });

  }

  addBusinessMarkers(businesss) {

    this.currentMarkers = this.currentMarkers.filter(item => {

      var match = businesss.findIndex(i => {
        return i.lat === item.lat && i.lng === item.lng;
      });
      if (match >= 0) {
        return true
      }
      item.marker.setMap(null);
      return false;
    });


    let me = this;
    let needToAdd = businesss.filter(function (el) {
      var match = me.currentMarkers.findIndex(i => {
        return i.lat === el.lat && i.lng === el.lng;
      });
      return match < 0;
    });

    needToAdd.forEach(business => {
      var contentString = '<h1>hello</h1>';
      let infoWindow = new google.maps.InfoWindow({
        content: `
            <h1 id = "${business._uid}">${business.name}</h1>
      `
      });
      google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
        document.getElementById(business._uid).addEventListener('click', () => {
          this.navCtrl.push("BusinessPromosPage", { key: business._uid });
        });
      });

      let latLng = new google.maps.LatLng(business.lat, business.lng);
      var marker = new google.maps.Marker({
        position: latLng,
        animation: google.maps.Animation.DROP,
        visible: true
      });
      marker.addListener('click', function () {
        infoWindow.open(this.map, marker);
      });
      marker.setMap(this.map);
      business.marker = marker;
      this.currentMarkers.push(business);
    });
  }


  disableMap(): void {
    this.toastMes("disable map" + this.pleaseConnect)
    
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "block";
    }
  }

  changeRadius(radius) {
    this.radius.next(radius);
  }

  enableMap(): void {
    this.toastMes("enable map" + this.pleaseConnect)
    
    if (this.pleaseConnect) {
      this.pleaseConnect.style.display = "none";
    }

    this.locationCircle = new google.maps.Circle({
      strokeColor: '#0000ff',
      strokeOpacity: 0,
      strokeWeight: 0,
      fillColor: '#0000ff',
      fillOpacity: 0.12,
      map: this.getMap(),
    });

    this.radius.subscribe(radius => {
      this.locationCircle.setRadius(this.math.mileToMeter(radius));
      this.defaultRadius = radius
    })

    this.getMapDataPoints().subscribe(location => {
      this.zone.run(() => {
        this.addBusinessMarkers(location)
      });
    });

  }

  addConnectivityListeners(): void {

    this.connectivityService.watchOnline().subscribe(() => {

      setTimeout(() => {

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
          this.loadGoogleMaps();
        }
        else {
          if (!this.mapInitialised) {
            this.initMap();
          }

          this.enableMap();
        }

      }, 2000);

    });

    this.connectivityService.watchOffline().subscribe(() => {
      this.disableMap();
    });

  }


  dispose() {


  }



}
