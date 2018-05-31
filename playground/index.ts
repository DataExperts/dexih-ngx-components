/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgxMdModule } from 'ngx-md';

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
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxMdModule.forRoot(),
    DexihComponentsModule,
    RouterModule.forRoot(ROUTES),
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
