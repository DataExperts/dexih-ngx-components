/**
 * This is only for local test
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgxMdModule } from 'ngx-md';
import { BsDropdownModule, ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap';

// import { DexihComponentsModule }  from 'dexih-ngx-components';
import { DexihComponentsModule }  from '../src';

import { AppComponent} from './app';

const ROUTES: Route[] = [
  // HERE ROUTES DEFINITIONS
];

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    BsModalService,
    BsModalRef
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES),
    NgxMdModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    DexihComponentsModule,
  ],

})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
