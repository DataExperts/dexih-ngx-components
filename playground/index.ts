/**
 * This is only for local test
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { DexihComponentsModule }  from 'dexih-ngx-components';

import { AppComponent} from './app';

@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DexihComponentsModule
  ]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
