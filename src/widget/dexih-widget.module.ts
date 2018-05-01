import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DexihWidgetComponent } from './dexih-widget.component';
import { DexihWidgetColumnsComponent } from './dexih-widget-columns.component';
import { DexihWidgetDeckComponent } from './dexih-widget-deck.component';
import { DexihWidgetVerticalComponent } from './dexih-widget-vertical.component';

import 'rxjs/add/operator/debounceTime';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DexihWidgetComponent,
    DexihWidgetColumnsComponent,
    DexihWidgetDeckComponent,
    DexihWidgetVerticalComponent
  ],
  exports: [
    DexihWidgetComponent,
    DexihWidgetColumnsComponent,
    DexihWidgetDeckComponent,
    DexihWidgetVerticalComponent
  ],
})
export class DexihWidgetModule {
}
