import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DexihWidgetComponent } from './dexih-widget.component';
import { DexihWidgetGroupComponent } from './dexih-widget-group.component';
import { Observable } from 'rxjs/Rx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import 'rxjs/add/operator/debounceTime';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  declarations: [
    DexihWidgetComponent,
    DexihWidgetGroupComponent],
  exports: [
    DexihWidgetComponent,
    DexihWidgetGroupComponent],
})
export class DexihWidgetModule {
}
