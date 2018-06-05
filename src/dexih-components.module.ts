import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DexihWidgetModule } from './widget/dexih-widget.module';
import { DexihButtonsModule } from './buttons/dexihButtons.module';
import { DexihFormControlsModule } from './form-controls/dexih-form-controls.module';
import { NgxMdModule } from 'ngx-md';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxMdModule,
    DexihWidgetModule,
    DexihButtonsModule,
    DexihFormControlsModule,
    // RouterModule,
  ],
  declarations: [
  ],
  exports: [
    // RouterModule,
    // NgxMdModule,
    DexihWidgetModule,
    DexihButtonsModule,
    DexihFormControlsModule
  ]
})
export class DexihComponentsModule {
}
