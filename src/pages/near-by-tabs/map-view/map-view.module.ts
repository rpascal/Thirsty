import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MapViewPage } from './map-view';

@NgModule({
  declarations: [
    MapViewPage,
  ],
  entryComponents: [
  ],
  imports: [
    IonicPageModule.forChild(MapViewPage),
  ],
})
export class MapViewPageModule { }
