import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NearByTabsPage } from './near-by-tabs';

// import { MapViewPageModule } from './map-view/map-view.module'
// import { ListViewPageModule } from './list-view/list-view.module'

@NgModule({
  declarations: [
    NearByTabsPage,
    // MapViewPage,
    // ListViewPage
  ],
  imports: [
    IonicPageModule.forChild(NearByTabsPage),
    // MapViewPageModule,
    // ListViewPageModule
  ],
  // entryComponents: [
  //   MapViewPage,
  //   ListViewPage
  // ],
  providers: [

  ]
})
export class NearByTabsPageModule { }
