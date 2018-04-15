/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import { DexihComponentsModule }  from 'dexih-ngx-components';
import { DexihComponentsModule }  from '../src';

import { AppComponent} from './app';
import { RouterModule, Route } from '@angular/router';

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
    RouterModule.forRoot(ROUTES),
    DexihComponentsModule
  ],
  exports: [
    RouterModule
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
