import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DexihWidgetComponent } from './dexih-widget.component';
import { DexihWidgetsGridComponent } from './dexih-widgets-grid.component';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/debounceTime';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DexihWidgetComponent,
    DexihWidgetsGridComponent],
  exports: [
    DexihWidgetComponent,
    DexihWidgetsGridComponent],
})
export class DexihWidgetModule {
}
