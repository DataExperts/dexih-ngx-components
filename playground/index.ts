/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DexihComponentsModule }  from 'dexih-ngx-components';

import { AppComponent} from './app';
import { RouterModule } from '@angular/router';

const ROUTES = [
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
    RouterModule.forRoot(ROUTES),
    DexihComponentsModule
  ],
  exports: [
    RouterModule
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
